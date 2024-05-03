import React, { useEffect, useState, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import search from "../assets/search.png";
import clear from "../assets/clear.png";

const Meals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealGrid, setMealGrid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [pieChart, setPieChart] = useState({
    datasets: [
      {
        label: [],
        data: [],
      },
    ],
    labels: [],
  });

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
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL_}`, {
          signal: abortController.signal,
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
      abortController.abort();
    };
  }, []);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    filterMeals();
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleResetFilters = () => {
    setSelectedCourse("");
    setSearchQuery("");
    setFilterOption("");
  };

  const filterMeals = useMemo(() => {
    let filteredMeals = mealGrid.filter((meal) => {
      const mealNameMatches = meal.mealName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const ingredientMatches = meal.ingredients.some((ingredient) =>
        ingredient.ingName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return mealNameMatches || ingredientMatches;
    });

    filteredMeals = filteredMeals.filter(
      (meal) => meal.course === selectedCourse || selectedCourse === ""
    );

    // Apply additional filters based on the selected option
    if (filterOption) {
      return filteredMeals.filter((meal) => {
        const fatNutrient = meal.nutrients.find((nutr) => nutr.name === "Fats");
        const carbsNutrient = meal.nutrients.find(
          (nutr) => nutr.name === "Carbs"
        );

        if (!fatNutrient || !carbsNutrient) return false;

        const fatValue = parseFloat(fatNutrient.measure.replace("g", ""));
        const carbsValue = parseFloat(carbsNutrient.measure.replace("g", ""));

        if (filterOption === "lowCarbs" && carbsValue < 15) return true;
        if (filterOption === "highCarbs" && carbsValue > 45) return true;
        if (
          filterOption === "moderateCarbs" &&
          carbsValue >= 15 &&
          carbsValue <= 45
        )
          return true;

        if (filterOption === "lowFat" && fatValue < 3.5) return true;
        if (filterOption === "highFat" && fatValue > 17.5) return true;
        if (
          filterOption === "moderateFat" &&
          fatValue >= 3.5 &&
          fatValue <= 17.5
        )
          return true;

        if (filterOption === "lowCalories" && meal.calories < 160) return true;
        if (filterOption === "highCalories" && meal.calories > 300) return true;
        if (
          filterOption === "moderateCalories" &&
          meal.calories >= 160 &&
          meal.calories <= 300
        )
          return true;

        return false;
      });
    }

    return filteredMeals; // Return all meals if no filters are applied
  }, [mealGrid, searchQuery, selectedCourse, filterOption]);

  const filteredMeals = filterMeals;

  return (
    <div className="generator-main-div w-full flex flex-col justify-center items-center my-4">
      <div className="w-[93.5%] my-3">
        <h1 className="text-6xl font tracking-[2px]">ALL MEALS</h1>
      </div>
      <div className="flex justify-between items-center my-5 w-[94%] bg-white">
        <div className="flex justify-center items-center p-2 options rounded-[10px] w-[450px] border-[3px] ">
          <input
            type="search"
            className="searchbar px-2 flex-1"
            placeholder="Search Meals or Ingredients"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <img
            src={search}
            alt=""
            style={{ width: "25px", cursor: "pointer" }}
            onClick={handleSearchClick}
          />
        </div>
        <div className="flex justify-between items-center w-[30%]">
          <select
            value={selectedCourse}
            onChange={handleCourseChange}
            className="options p-3 rounded-[10px] text-[#56B24E] border-[3px] "
          >
            <option value="">All Courses</option>
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="SNACK">Snack</option>
            <option value="DINNER">Dinner</option>
          </select>
          <select
            value={filterOption}
            onChange={handleFilterChange}
            className="options p-3 rounded-[10px] text-[#56B24E] border-[3px] "
          >
            <option value="">Filter</option>
            <option value="lowCarbs">Low Carbs</option>
            <option value="lowFat">Low Fat</option>
            <option value="lowCalories">Low Calories</option>
            <option value="moderateCarbs">Moderate Carbs</option>
            <option value="moderateFat">Moderate Fat</option>
            <option value="moderateCalories">Moderate Calories</option>
            <option value="highCarbs">High Carbs</option>
            <option value="highFat">High Fat</option>
            <option value="highCalories">High Calories</option>
          </select>
          <button
            title="Reset Filters"
            className="reset p-2 bg-white text-white rounded-[13px] border-3 border-[#56B24E]"
            onClick={handleResetFilters}
          >
            <img src={clear} alt="" style={{ width: "33px" }} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center w-full my-8">
        {error && (
          <div className="error-message text-xl font tracking-[2px]">
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
        ) : filteredMeals.length === 0 ? (
          <div className="no-meals-message text-4xl font tracking-[2px] h-[60vh] flex flex-col justify-center items-center">
            <p>Sorry, there are no meals matching your filters.</p>
            <p>They will be added shortly.</p>
          </div>
        ) : (
          <div
            className="generator-meal-grid grid w-[95%] mt-[-2%] mb-[2%]"
            style={{ gridTemplateColumns: "repeat(4 , 1fr)" }}
          >
            {filteredMeals.map((meal, i) => {
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
            className={`meal-modal-box bg-white p-8 rounded-md w-[97%] h-[95%] ${
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
                      <h1>PREPARATION TIME:</h1>
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

export default Meals;
