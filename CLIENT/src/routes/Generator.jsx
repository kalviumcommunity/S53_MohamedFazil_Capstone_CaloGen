import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/logo.png";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const Generator = () => {
  const { register, handleSubmit } = useForm();

  const [totalCalories, setTotalCalories] = useState(0);
  const [mealNum, setMealNum] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealGrid, setMealGrid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pieChart, setPieChart] = useState({
    datasets: [
      {
        label: [],
        data: [],
      },
    ],
    labels: [],
  });

  const onSubmit = (data) => {
    const { calories, numberOfMeals } = data;
    const total = parseInt(calories);
    const noMeals = parseInt(numberOfMeals);
    setTotalCalories(total);
    setMealNum(noMeals);
  };

  const handleViewModal = (meal) => {
    setSelectedMeal(meal);
    const pieChartData = {
      datasets: [
        {
          label: "Percentage",
          data: meal.pie_chart.map((data) => data.value),
        },
      ],
      labels: meal.pie_chart.map((data) => data.name),
    };
    setPieChart(pieChartData);
    setIsModalOpen(true);
    setTimeout(() => {
      setModalAnimation(true);
    }, 300);

    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalAnimation(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const abortController = new AbortController(); // Step 2

    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL_}`, {
          signal: abortController.signal, // Step 4
        });
        setMealGrid(response.data);
      } catch (error) {
        console.log("error: ", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort(); // Step 5
    };
  }, []);

  return (
    <div className="generator-main-div w-full flex flex-col justify-center items-center my-3">
      <div className="generator-container flex justify-between items-center w-3/4 bg-[#56B24E] rounded-[10px] p-3">
        <div className="gen-tagline text-7xl text-white w-1/2 p-5 tracking-[1px] font-extrabold">
          Generate The Right Meal For You
        </div>
        <div className="gen-formbox flex flex-col justify-start items-stretch m-3 bg-white rounded-[10px] p-2 w-[35%]">
          <div className="flex flex-col justify-center items-center">
            <img
              src={Logo}
              alt=""
              className="p-2"
              style={{
                width: "70px",
              }}
            />
            <h3 className="text-s text-[#0000006e]">
              Generate Meal with Calories
            </h3>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form flex flex-col justify-center items-center p-[3%] mx-[3%]"
          >
            <fieldset className="rounded-[10px]">
              <legend>Calories</legend>
              <input
                {...register("calories")}
                type="number"
                step="100"
                defaultValue="0"
                min="0"
                max="8000"
                className="w-full text-[#000000]"
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
                className="w-full text-[#000000]"
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
      <div className="gen-meal-heading flex justify-between items-center m-[5%] w-[90%]">
        <div>
          <h1 className="text-5xl">GENERATED RESULT</h1>
          <h4 className="m-[1%] ">TOTAL CALORIES: {totalCalories}</h4>
        </div>
        <button className="m-1 p-2 bg-[#56B24E] text-white rounded-[13px] w-[150px] tracking-[1px]">
          REGENERATE
        </button>
      </div>
      <div className="flex items-center justify-center w-full">
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
        {isLoading ? (
          <div className="loading-container mb-[2%]">
            <img
              src="https://i.pinimg.com/originals/e6/13/21/e613212546d6c27600379a26cd601365.gif"
              alt=""
            />
            <p>Loading Meals...</p>
          </div>
        ) : (
          <div
            className="generator-meal-grid grid w-[95%] mt-[-2%] mb-[2%]"
            style={{ gridTemplateColumns: `repeat(${mealNum}  , 1fr)` }}
          >
            {mealGrid &&
              mealGrid.map((meal, i) => {
                return (
                  <div
                    key={i}
                    className="gen-meal-card flex flex-col justify-center items-center p-4 m-[2%] rounded-[15px] bg-white border-[3px]"
                  >
                    <img
                      src={meal.img}
                      alt=""
                      className="w-[230px] h-[180px] rounded-[20px]"
                    />
                    <h1 className="text-base font-medium tracking-[1px] m-[6px] text-gray-500 underline">
                      {meal.course}
                    </h1>
                    <p className="text-xl font-medium tracking-[1px] mb-[8px] text-center">
                      {meal.mealName}
                    </p>
                    <div className="nutrients flex flex-col justify-center items-center w-[80%]">
                      {meal.nutrients.slice(0, 3).map((nutr, j) => {
                        return (
                          <div
                            key={j}
                            className="flex justify-between items-center w-[100%]"
                          >
                            <h4>{nutr.name}</h4>
                            <h3>{nutr.measure}</h3>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => handleViewModal(meal)}
                      className="m-1 p-2 bg-[#56B24E] text-white rounded-[13px] w-[100px] tracking-[1px] mt-[20px]"
                    >
                      VIEW
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {isModalOpen && selectedMeal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-[2]">
          <div
            className={`meal-modal-box bg-white p-8 rounded-md w-[90%] h-[95%] ${
              modalAnimation ? "open" : ""
            } `}
          >
            <div className="flex justify-between items-center pb-2 border-b-2">
              <h2 className="text-4xl font-bold mb-4 text-center flex-1 underline">
                {selectedMeal && selectedMeal.course}
              </h2>
              <button
                onClick={handleCloseModal}
                className="h-[30px] w-[30px] bg-[#56B24E] text-white rounded-md flex items-center justify-center hover:bg-[#88be03]"
              >
                &times;
              </button>
            </div>
            <div className="meal-modal-inner-box h-[90%] overflow-scroll overflow-x-hidden p-2 m-2 ">
              <div className="meal-modal-intro flex justify-between items-center w-full bg-[#56B24E] p-4 rounded-[10px]">
                <img
                  src={selectedMeal.img}
                  alt=""
                  className="w-[450px] h-[320px] rounded-[10px]"
                />
                <div className="prep-box w-3/5 text-2xl text-white ">
                  <h1 className="text-4xl underline py-4">
                    {selectedMeal.mealName}
                  </h1>
                  <div>
                    <div className="flex justify-between items-center w-[60%] my-4">
                      <h1>PREPERATION TIME:</h1>
                      <h2>{selectedMeal.prepTime}</h2>
                    </div>
                    <div className="flex justify-between items-center w-[60%] my-4">
                      <h1>COOKING TIME:</h1>
                      <h2>{selectedMeal.cookingTime}</h2>
                    </div>
                    <div className="flex justify-between items-center w-[60%] my-4">
                      <h1>CAL / SERVING:</h1>
                      <h2>{selectedMeal.calories}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="meal-modal-innerBox-2 flex justify-center items-center w-full my-4 ">
                <div className="modal-piechart h-[400px] w-[30%] overflow-scroll overflow-x-hidden p-4 rounded-[20px] mr-2">
                  <div className="flex flex-col justify-center items-center">
                    <Pie data={pieChart} />
                    {selectedMeal.nutrients.map((nutr, j) => {
                      return (
                        <div
                          key={j}
                          className="flex justify-between items-center w-[100%]"
                        >
                          <h4 className="font-bold">{nutr.name}</h4>
                          <h3>{nutr.measure}</h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="modal-ingredients p-4 rounded-[20px] w-[70%] ml-2 h-[400px] overflow-scroll overflow-x-hidden">
                  <h1 className="text-center text-3xl font underline">
                    Ingredients
                  </h1>
                  <div className="flex flex-col justify-center items-center">
                    {selectedMeal.ingredients.map((ing, j) => {
                      return (
                        <div
                          key={j}
                          className="flex justify-between items-center w-[100%] my-2 "
                        >
                          <h4 className="font-bold">
                            {ing.ingName}{" "}
                            <span className="text-red-400 font-black">
                              {ing.rTags}
                            </span>
                          </h4>
                          <h3>{ing.ingMeasure}</h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="meal-recipe-modal-box p-4 rounded-[20px] my-4">
                <h1 className="text-center text-3xl font underline">Recipe</h1>
                <ol className="flex flex-col justify-center items-center p-4">
                  {selectedMeal &&
                    selectedMeal.recipe.map((step, j) => {
                      return (
                        <li key={j} className="list-decimal w-[100%] my-2 ">
                          {step}
                        </li>
                      );
                    })}
                </ol>
              </div>
              {selectedMeal.ingredients.some(
                (ingredient) => ingredient.rTags
              ) && (
                <div className="meal-caution-modal-box p-4 rounded-[20px]">
                  <h1 className="text-center text-3xl font underline">
                    Dietary Info
                  </h1>
                  <ul className="list-disc flex flex-col justify-center items-center p-4">
                    {[
                      ...new Set(
                        selectedMeal.ingredients
                          .filter((ingredient) => ingredient.rTags)
                          .map((ingredient) => ingredient.rTags)
                      ),
                    ].map((rTag, index) => {
                      let description = "";
                      if (rTag === "^") {
                        description =
                          "This meal contains pork or beef which is not suitable for Muslims or Hindus respectively. Please find other substitutes for these ingredients.";
                      } else if (rTag === "!") {
                        description =
                          "This meal contains alcohol as an ingredient.";
                      } else if (rTag === "#") {
                        description =
                          "This meal contains eggs as an ingredient. You can prefer not to add eggs.";
                      } else if (rTag == "*") {
                        description =
                          "This ingredient is optional for individuals adhering to Jainism and may be omitted.";
                      }
                      return (
                        <li key={index} className="list-disc w-[100%] my-2 ">
                          <span className="text-red-400 font-black">
                            {rTag}
                          </span>{" "}
                          {description && <span>: {description}</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Generator;
