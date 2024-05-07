import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logo from "./../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies([
    "userToken",
    "userName",
    "userReligion",
  ]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const formSubmitHandler = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AUTH_SERVER_URL_}/login`,
        data
      );
      console.log("response: ", response.data);

      // Check if password is correct
      if (response.data.isPasswordValid) {
        setCookie("userToken", response.data.token);
        setCookie("userName", response.data.user_name);
        setCookie("userReligion", response.data.religion);
        setTimeout(() => {
          toast.success("Logged In Successfully!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }, 1000);
        setTimeout(() => {
          navigate("/gen");
        }, 3000);
      } else {
        // Display error message if password is incorrect
        toast.error("Incorrect password. Please try again.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log("passwordValid: ", response.data.isPasswordValid);
      }
    } catch (error) {
      console.error("Error logging in:", error);

      // Display error message
      toast.error("Error logging in. Please try again.", {
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
            LOG <span className="text-[#56B24E]">IN</span>
          </h1>
          <form
            onSubmit={handleSubmit(formSubmitHandler)}
            className="signup-form flex flex-col justify-center gap-2 w-full p-2"
          >
            <label className="form-label">
              Username
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
              Password
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
            <label className="label-flex gap-2">
              <h2>Show Password</h2>
              <input type="checkbox" onClick={togglePasswordVisibility} />
            </label>

            <div className="button-flex ">
              <input
                type="submit"
                value="LOG IN"
                className="signup-btn px-8 py-1 text-[#56B24E] border-3 border-[#56B24E] rounded-3xl font-bold signinbtn hover:underline bg-white"
              />
            </div>
            <Link
              to="/signin"
              className="text-center hover:underline hover:text-customGreen"
            >
              Don't have an account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
