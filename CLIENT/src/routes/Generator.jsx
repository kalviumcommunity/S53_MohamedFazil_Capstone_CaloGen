import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/logo.png";

const Generator = () => {
  const { register, handleSubmit } = useForm();

  const [totalCalories, setTotalCalories] = useState(0); // State to hold total calories

  const onSubmit = (data) => {
    // Calculate total calories based on form data
    const { calories } = data;
    const total = parseInt(calories);
    setTotalCalories(total);
    console.log(data);
  };

  const mealGrid = [
    {
      course: "BREAKFAST",
      img: "https://colonydiner.com/wp-content/uploads/2021/03/French.jpg",
      mealName: "English Breakfast",
      nutrients: [
        {
          name: "Fats",
          measure: "12g",
        },
        {
          name: "Fibre",
          measure: "12g",
        },
        {
          name: "Carbs",
          measure: "12g",
        },
      ],
    },
    {
      course: "LUNCH",
      img: "https://ikarolina.com/wp-content/uploads/2021/09/healthy-low-carb-lean-beef-burgers.jpg",
      mealName: "Protein Burger",
      nutrients: [
        {
          name: "Fats",
          measure: "12g",
        },
        {
          name: "Fibre",
          measure: "12g",
        },
        {
          name: "Carbs",
          measure: "12g",
        },
      ],
    },
    {
      course: "SNACK",
      img: "https://www.eatthis.com/wp-content/uploads/sites/4/2022/11/healthy-high-fiber-snack-plate.jpg?quality=82&strip=1",
      mealName: "Fiber Snack",
      nutrients: [
        {
          name: "Fats",
          measure: "12g",
        },
        {
          name: "Fibre",
          measure: "12g",
        },
        {
          name: "Carbs",
          measure: "12g",
        },
      ],
    },
    {
      course: "DINNER",
      img: "https://www.foodandwine.com/thmb/CqyQH1MrXLynH3iZ0PEEfZ4Ki6Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steak-au-poivre-red-wine-pan-sauce-hero-01-FT-RECIPE1222-c9e1da15f33f4076986b6ce37ae5bbb0.jpg",
      mealName: "Beef Steak",
      nutrients: [
        {
          name: "Fats",
          measure: "12g",
        },
        {
          name: "Fibre",
          measure: "12g",
        },
        {
          name: "Carbs",
          measure: "12g",
        },
      ],
    },
  ];

  return (
    <div className="generator-main-div w-full flex flex-col justify-center items-center my-3">
      <div className="generator-container flex justify-between items-center w-3/4 bg-[#56B24E] rounded-[10px] p-3">
        <div className="gen-tagline text-7xl text-white w-1/2 p-5 tracking-[1px] font-extrabold">
          Generate Now and Find the Right Meal for You
        </div>
        <div className="gen-formbox flex flex-col justify-start items-stretch m-3 bg-white rounded-[10px] p-2 w-[35%]">
          <div className="flex flex-col justify-center items-center">
            <img src={Logo} alt="" className="p-2" />
            <h3 className="text-s text-[#0000006e]">
              Generate Meal with Calories
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form flex flex-col justify-center items-center p-[3%] mx-[3%]"
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
            <div className="flex justify-start items-start w-full">
              <button
                type="submit"
                className="m-1 p-2 bg-[#56B24E] text-white rounded-[13px] w-[150px] tracking-[1px]"
              >
                GENERATE
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="gen-meal-heading flex justify-between items-center m-[5%] w-3/4">
        <div>
          <h1 className="text-5xl">GENERATED RESULT</h1>
          <h4 className="m-[1%] ">TOTAL CALORIES: {totalCalories}</h4>
        </div>
        <button className="m-1 p-2 bg-[#56B24E] text-white rounded-[13px] w-[150px] tracking-[1px]">
          REGENERATE
        </button>
      </div>
      <div className="generator-meal-grid grid grid-cols-4 w-[80%] mt-[-2%] mb-[2%]">
        {mealGrid.map((meal, i) => {
          return (
            <div
              key={i}
              className="gen-meal-card flex flex-col justify-center items-center p-4 mx-[2%] rounded-[15px]"
            >
              <img
                src={meal.img}
                alt=""
                className="w-[230px] h-[180px] rounded-[20px]"
              />
              <h1 className="text-base font-medium tracking-[1px] m-[6px] text-gray-500 underline">
                {meal.course}
              </h1>
              <p className="text-xl font-medium tracking-[1px] mb-[8px]">
                {meal.mealName}
              </p>
              <div className="nutrients flex flex-col justify-center items-center w-[80%]">
                {meal.nutrients.map((nutr, j) => {
                  return (
                    <div
                      key={j}
                      className="flex justify-between items-center w-[100%]"
                    >
                      <h4>{nutr.name}</h4>
                      <div>------------</div>
                      <h3>{nutr.measure}</h3>
                    </div>
                  );
                })}
              </div>
              <button className="mt-4 p-2 bg-[#56B24E] text-white rounded-[13px] w-[100px] tracking-[1px]">VIEW</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Generator;
