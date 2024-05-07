import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const Auth = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie] = useCookies([
    "userToken",
    "userName",
    "userReligion",
  ]);

  const onSubmit = async (data) => {
    try {
      // Remove retypePassword from data
      const { retypePassword, ...postData } = data;
      console.log("postData: ", postData);

      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_SERVER_URL_}/signin`,
        postData
      );

      setCookie("userToken", response.data.token);
      setCookie("userName", response.data.user_name);
      setCookie("userReligion", response.data.religion);

      toast.success("Signed In!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/gen");
      }, 2000);
    } catch (error) {
      console.error("Error signing up:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message === "User already exists!"
      ) {
        // Prompt the user to change username
        toast.error(
          "Username already exists. Please choose a different username.",
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      } else {
        toast.error("Error signing up. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="auth-container w-[45%] gen-meal-card p-4 m-[2%] rounded-[15px] bg-white border-[3px]">
        <ToastContainer />
        <div className="form flex flex-col justify-center items-center">
          <img
            src={logo}
            alt=""
            style={{
              width: "40px",
              margin: "10px",
            }}
          />
          <h1 className="pb-2 border-b-2 w-full text-center text-xl">
            CREATE <span className="text-[#56B24E]">ACCOUNT</span>
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="signup-form flex flex-col justify-center gap-2 w-full p-2"
          >
            <label className="form-label">
              Enter Your Name
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                className="form-input"
              />
              {errors.name && <p className="err">{errors.name.message}</p>}
            </label>
            <label className="form-label">
              Create Username
              <input
                type="text"
                {...register("user_name", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
                className="form-input"
              />
              {errors.user_name && (
                <p className="err">{errors.user_name.message}</p>
              )}
            </label>
            <label className="form-label">
              Select a Religion
              <select
                {...register("religion", {
                  required: "Religion is required",
                })}
                className="religion-select form-input p-[7px]"
              >
                <option value="Hinduism">Hindu</option>
                <option value="Islam">Muslim</option>
                <option value="Christianity">Christian</option>
                <option value="Jainism">Jain</option>
                <option value="Buddhism">Buddhist</option>
                <option value="Sikhism">Sikh</option>
                <option value="None">Prefer Not to Say</option>
              </select>
              {errors.religion && (
                <p className="err">{errors.religion.message}</p>
              )}
            </label>

            <label className="form-label">
              Create Password
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className="form-input"
              />
              {errors.password && (
                <p className="err">{errors.password.message}</p>
              )}
            </label>
            <label className="form-label">
              Retype Password
              <input
                type={showPassword ? "text" : "password"}
                {...register("retypePassword", {
                  required: "Please retype your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className="form-input"
              />
              {errors.retypePassword && (
                <p className="err">{errors.retypePassword.message}</p>
              )}
            </label>
            <label className="label-flex gap-2">
              <h2>Show Password</h2>
              <input type="checkbox" onClick={togglePasswordVisibility} />
            </label>

            <div className="button-flex ">
              <input
                type="submit"
                value="SIGN UP"
                className="signup-btn px-8 py-1 text-[#56B24E] border-3 border-[#56B24E] rounded-3xl font-bold signinbtn hover:underline bg-white"
              />
            </div>
            <Link
              to="/login"
              className="text-center hover:underline hover:text-customGreen"
            >
              Already have an account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
