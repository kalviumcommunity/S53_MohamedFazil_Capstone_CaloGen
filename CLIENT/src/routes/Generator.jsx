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
        <div className="gen-formbox flex flex-col justify-center items-center m-3 bg-white rounded-[10px] p-2">
          <img src={Logo} alt="" className="p-2" />
          <h3 className="text-s text-[#0000006e]">
            Generate Meal with Calories
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form flex flex-col justify-center items-center"
          >
            <select
              {...register("type")}
              className="m-1 p-2 rounded text-[#c6c6c6]"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <input
              {...register("calories", { min: 0, max: 8000 })}
              type="number"
              placeholder="Calories"
              step="100"
              className="m-1 p-2 rounded"
            />
            <input
              {...register("numberOfMeals", { min: 0, max: 5 })}
              type="number"
              placeholder="Number of Meals"
              className="m-1 p-2 rounded"
            />
            <button
              type="submit"
              className="m-1 p-2 bg-[#56B24E] text-white rounded"
            >
              Generate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Generator;
