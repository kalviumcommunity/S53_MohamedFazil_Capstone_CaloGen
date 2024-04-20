import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/logo.png";
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const Generator = () => {
  const { register, handleSubmit } = useForm();

  const [totalCalories, setTotalCalories] = useState(0);
  const [mealNum, setMealNum] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
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
          label: "Percentage:",
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

  const mealGrid = [
    {
      course: "BREAKFAST",
      img: "https://unpeeledjournal.com/wp-content/uploads/2023/04/52828002762_99f3b99b45_b.jpg",
      mealName: "English Breakfast",
      calories: 450,
      nutrients: [
        { name: "Fats", measure: "12g" },
        { name: "Protein", measure: "20g" },
        { name: "Carbs", measure: "30g" },
        { name: "Fiber", measure: "8g" },
        { name: "Sugar", measure: "5g" },
        { name: "Sodium", measure: "700mg" },
        { name: "Vitamin A", measure: "300 IU" },
        { name: "Vitamin C", measure: "10mg" },
      ],
      pie_chart: [
        { name: "Fats", value: "17", measure: "12g" },
        { name: "Protein", value: "28", measure: "20g" },
        { name: "Carbs", value: "43", measure: "30g" },
        { name: "Fiber", value: "12", measure: "8g" },
      ],
      prepTime: "20 minutes",
      cookingTime: "30 minutes",
      ingredients: [
        { ingName: "Bacon", ingMeasure: "3 pieces" },
        { ingName: "Sausages", ingMeasure: "3 pieces" },
        { ingName: "Eggs", ingMeasure: "2 count" },
        { ingName: "Tomatoes", ingMeasure: "1" },
        { ingName: "Mushrooms", ingMeasure: "2 pieces (optional)" },
        { ingName: "Toast", ingMeasure: "2 slices" },
        { ingName: "Beans ", ingMeasure: "100g" },
      ],
      recipe: [
        "Get the sausages cooking under a hot grill.",
        "Chop the veg, open the can of beans and cook in separate pans on the hob. The mushrooms are fried in butter with the tomatoes.",
        "Chop the veg, open the can of beans and cook in separate pans on the hob. The mushrooms are fried in butter with the tomatoes.",
        "The egg must be cooked in a clean frying pan with fresh vegetable oil. The oil should be no hotter than the boiling point of water (100 degrees C). The egg should be kept in one piece and the white part free of bubbles or other defects.",
        "By now the meat and hash browns should be cooked at it's time to serve up. When serving, traditionally the egg is served last but here we're going to serve it second to last just before the fried bread. The toast is flash fried at high temperature whilst everything else is kept warm under the grill.",
        "The egg is normally placed on top of some of the other ingredients, but none of the other ingredients should be on top of one another and side plates/pots etc are not allowed. Basically, it's all about getting as much on one plate as possible and if your plate is not big enough - get a bigger one!",
      ],
    },
    {
      course: "LUNCH",
      img: "https://ikarolina.com/wp-content/uploads/2021/09/healthy-low-carb-lean-beef-burgers.jpg",
      mealName: "Protein Burger",
      calories: 550,
      nutrients: [
        { name: "Fats", measure: "15g" },
        { name: "Protein", measure: "25g" },
        { name: "Carbs", measure: "35g" },
        { name: "Fiber", measure: "6g" },
        { name: "Sugar", measure: "2g" },
        { name: "Sodium", measure: "800mg" },
        { name: "Vitamin A", measure: "100 IU" },
        { name: "Vitamin C", measure: "15mg" },
      ],
      pie_chart: [
        { name: "Fats", value: "19", measure: "15g" },
        { name: "Protein", value: "31", measure: "25g" },
        { name: "Carbs", value: "44", measure: "35g" },
        { name: "Fiber", value: "6", measure: "6g" },
      ],
      prepTime: "15 minutes",
      cookingTime: "20 minutes",
      ingredients: [
        { ingName: "Lean Beef Patty", ingMeasure: "1 patty" },
        { ingName: "Whole Wheat Bun", ingMeasure: "1" },
        { ingName: "Lettuce", ingMeasure: "1 leaf" },
        { ingName: "Tomato", ingMeasure: "2 slices" },
        { ingName: "Onion", ingMeasure: "2 slices" },
        { ingName: "Pickles", ingMeasure: "2 slices" },
        { ingName: "Cheddar Cheese", ingMeasure: "1 slice" },
        { ingName: "Ketchup", ingMeasure: "1 tbsp" },
      ],
      recipe: [
        "Grill the lean beef patty to your desired level of doneness.",
        "Slice the whole wheat bun in half and lightly toast it on the grill.",
        "Layer the lettuce, tomato slices, onion slices, pickles, and cheddar cheese on top of the grilled beef patty.",
        "Spread ketchup on the top half of the toasted bun.",
        "Assemble the burger by placing the prepared top half of the bun on top of the cheese and toppings.",
        "Serve hot with your favorite side dish or salad.",
      ],
    },
    {
      course: "SNACK",
      img: "https://www.eatthis.com/wp-content/uploads/sites/4/2022/11/healthy-high-fiber-snack-plate.jpg?quality=82&strip=1",
      mealName: "Fiber Snack",
      calories: 120,
      nutrients: [
        { name: "Fats", measure: "5g" },
        { name: "Protein", measure: "3g" },
        { name: "Carbs", measure: "15g" },
        { name: "Fiber", measure: "10g" },
        { name: "Sugar", measure: "1g" },
        { name: "Sodium", measure: "200mg" },
        { name: "Vitamin A", measure: "50 IU" },
        { name: "Vitamin C", measure: "5mg" },
      ],
      pie_chart: [
        { name: "Fats", value: "17", measure: "5g" },
        { name: "Protein", value: "10", measure: "3g" },
        { name: "Carbs", value: "42", measure: "15g" },
        { name: "Fiber", value: "31", measure: "10g" },
      ],
      prepTime: "10 minutes",
      cookingTime: "0 minutes", // Assumed as it's a snack
      ingredients: [
        { ingName: "Almonds", ingMeasure: "10 pieces" },
        { ingName: "Walnuts", ingMeasure: "10 pieces" },
        { ingName: "Apple", ingMeasure: "1 medium" },
        { ingName: "Carrot", ingMeasure: "1" },
        { ingName: "Celery Sticks", ingMeasure: "2 sticks" },
        { ingName: "Greek Yogurt / Peanut Butter", ingMeasure: "1/2 cup" },
        { ingName: "Honey", ingMeasure: "1 tsp" },
        { ingName: "Cinnamon Powder", ingMeasure: "1/4 tsp" },
      ],
      recipe: [
        "Wash and slice the apple and carrot into bite-sized pieces.",
        "Arrange the apple slices, carrot sticks, and celery sticks on a plate.",
        "Serve the almonds and walnuts on the side.",
        "In a small bowl, mix Greek yogurt or peanut butter with honey and cinnamon powder to make a dip.",
        "Enjoy the fiber-rich snack with the dip!",
      ],
    },
    {
      course: "DINNER",
      img: "https://www.foodandwine.com/thmb/CqyQH1MrXLynH3iZ0PEEfZ4Ki6Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/steak-au-poivre-red-wine-pan-sauce-hero-01-FT-RECIPE1222-c9e1da15f33f4076986b6ce37ae5bbb0.jpg",
      mealName: "Beef Steak",
      calories: 350,
      nutrients: [
        { name: "Fats", measure: "18g" },
        { name: "Protein", measure: "30g" },
        { name: "Carbs", measure: "5g" },
        { name: "Fiber", measure: "2g" },
        { name: "Sugar", measure: "0g" },
        { name: "Sodium", measure: "600mg" },
        { name: "Vitamin A", measure: "150 IU" },
        { name: "Vitamin C", measure: "8mg" },
      ],
      pie_chart: [
        { name: "Fats", value: "35", measure: "18g" },
        { name: "Protein", value: "58", measure: "30g" },
        { name: "Carbs", value: "3", measure: "5g" },
        { name: "Fiber", value: "4", measure: "2g" },
      ],
      prepTime: "15 minutes",
      cookingTime: "25 minutes",
      ingredients: [
        { ingName: "Beef Steak", ingMeasure: "1 piece (150g)" },
        { ingName: "Olive Oil", ingMeasure: "1 tbsp" },
        { ingName: "Salt", ingMeasure: "1/2 tsp" },
        { ingName: "Black Pepper", ingMeasure: "1/2 tsp" },
        { ingName: "Garlic", ingMeasure: "2 cloves" },
        { ingName: "Rosemary", ingMeasure: "1 sprig" },
        { ingName: "Butter", ingMeasure: "1 tbsp" },
        { ingName: "Red Wine", ingMeasure: "1/4 cup" },
      ],
      recipe: [
        "Remove the beef steak from the refrigerator and let it come to room temperature for about 30 minutes.",
        "Preheat the grill or a skillet over medium-high heat.",
        "Rub the steak with olive oil, salt, black pepper, minced garlic, and chopped rosemary.",
        "Place the steak on the grill or skillet and cook for about 4-5 minutes on each side for medium-rare, or longer according to your preference.",
        "Remove the steak from the grill or skillet and let it rest for 5 minutes.",
        "Meanwhile, in a small saucepan, melt the butter over medium heat. Add the red wine and simmer until slightly reduced, about 3-4 minutes.",
        "Slice the steak against the grain and serve with the red wine pan sauce.",
        "Enjoy your delicious beef steak dinner!",
      ],
    },
  ];

  return (
    <div className="generator-main-div w-full flex flex-col justify-center items-center my-3">
      <div className="generator-container flex justify-between items-center w-3/4 bg-[#56B24E] rounded-[10px] p-3">
        <div className="gen-tagline text-7xl text-white w-1/2 p-5 tracking-[1px] font-extrabold">
          Generate The Right Meal For You
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
      <div className="gen-meal-heading flex justify-between items-center m-[5%] w-3/4">
        <div>
          <h1 className="text-5xl">GENERATED RESULT</h1>
          <h4 className="m-[1%] ">TOTAL CALORIES: {totalCalories}</h4>
        </div>
        <button className="m-1 p-2 bg-[#56B24E] text-white rounded-[13px] w-[150px] tracking-[1px]">
          REGENERATE
        </button>
      </div>
      <div
        className="generator-meal-grid grid w-[85%] mt-[-2%] mb-[2%]"
        style={{ gridTemplateColumns: `repeat(${mealNum}  , 1fr)` }}
      >
        {mealGrid.map((meal, i) => {
          return (
            <div
              key={i}
              className="gen-meal-card flex flex-col justify-center items-center p-4 m-[2%] rounded-[15px] bg-white"
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
                className="mt-4 p-2 bg-[#56B24E] text-white rounded-[13px] w-[100px] tracking-[1px]"
              >
                VIEW
              </button>
            </div>
          );
        })}
      </div>
      {isModalOpen && selectedMeal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-[2]">
          <div
            className={`meal-modal-box bg-white p-8 rounded-md w-[90%] h-[95%] ${modalAnimation ? "open" : ""} `}
          >
            <div className="flex justify-between items-center pb-2 border-b-2">
              <button
                onClick={handleCloseModal}
                className="h-[30px] w-[30px] bg-[#56B24E] text-white rounded-md flex items-center justify-center hover:bg-[#88be03]"
              >
                &times;
              </button>
              <h2 className="text-4xl font-bold mb-4 text-center flex-1 underline">
                {selectedMeal && selectedMeal.course}
              </h2>
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
                <div className="modal-ingredients p-4 rounded-[20px] w-[70%] ml-2 h-[400px]">
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
                          <h4 className="font-bold">{ing.ingName}</h4>
                          <h3>{ing.ingMeasure}</h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="meal-recipe-modal-box p-4 rounded-[20px]">
                <h1 className="text-center text-3xl font underline">Recipe</h1>
                <ol className="flex flex-col justify-center items-center p-4">
                  {selectedMeal.recipe.map((step, j) => {
                    return (
                      <li key={j} className="list-decimal w-[100%] my-2 ">
                        {step}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Generator;
