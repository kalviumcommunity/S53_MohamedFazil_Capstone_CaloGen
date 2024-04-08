import React from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/logo.png";

const Generator = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="generator-main-div w-full flex flex-col justify-center items-center my-3">
      <div className="generator-container flex justify-between items-center w-3/4 bg-[#56B24E] rounded-[10px] p-3">
        <div className="gen-tagline text-7xl text-white w-1/2 p-5">
          Generate Now and Find the Right Meal for You
        </div>
        <div className="gen-formbox flex flex-col justify-start items-stretch m-3 bg-white rounded-[10px] p-2">
          <div className="flex flex-col justify-center items-center">
            <img src={Logo} alt="" className="p-2" />
            <h3 className="text-s text-[#0000006e]">
              Generate Meal with Calories
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form flex flex-col justify-center items-center"
          >
            <fieldset className="rounded-[10px]">
              <legend>Diet Type</legend>
              <select {...register("type")} className="w-full text-[#989898] ">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </fieldset>
            <fieldset className="rounded-[10px]">
              <legend>Calories</legend>
              <input
                {...register("calories")}
                type="number"
                step="100"
                defaultValue="0"
                min="0"
                max="8000"
                className="w-full"
              />
            </fieldset>
            <fieldset className="rounded-[10px]">
              <legend>Number of Meals</legend>
              <input
                {...register("numberOfMeals")}
                type="number"
                defaultValue="1"
                min="1"
                max="4"
                className="w-full"
              />
            </fieldset>
            <div className="">
              <button
                type="submit"
                className="m-1 p-2 bg-[#56B24E] text-white rounded-[13px]"
              >
                Generate
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Generator;
