const MealModel = require("../Models/mealsModel.js");

const getAllMeals = async (req, res) => {
  try {
    const data = await MealModel.find();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in receiving data", error: error.message });
  }
};

const getOneMealByID = async (req, res) => {
  try {
    const id = req.params.id;
    res
      .status(200)
      .json({ message: `Meal(${id}) has been retrieved from the database.` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in receiving data", error: error.message });
  }
};

const getMealsByCaloriesAndCount = async (req, res) => {
  try {
    const { calories, numberOfMeals } = req.body;
    const totalCalories = parseInt(calories);
    const mealCount = parseInt(numberOfMeals);

    if (
      isNaN(totalCalories) ||
      isNaN(mealCount) ||
      mealCount < 1 ||
      mealCount > 4
    ) {
      return res.status(400).json({ message: "Invalid input values" });
    }

    // Determine required meal types
    const mealTypes = getMealTypes(mealCount);

    // Fetch meals based on meal types
    const meals = await MealModel.find({ course: { $in: mealTypes } });

    // Filter meals to find valid combinations
    const selectedMeals = selectMeals(
      meals,
      mealTypes,
      totalCalories,
      mealCount
    );

    if (!selectedMeals) {
      return res.status(400).json({ message: "No suitable combination found" });
    }

    res.status(200).json(selectedMeals);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in processing data", error: error.message });
  }
};

// Function to get meal types based on meal count
const getMealTypes = (mealCount) => {
  switch (mealCount) {
    case 1:
      return ["LUNCH"];
    case 2:
      return ["BREAKFAST", "DINNER"];
    case 3:
      return ["BREAKFAST", "LUNCH", "DINNER"];
    case 4:
      return ["BREAKFAST", "LUNCH", "SNACK", "DINNER"];
    default:
      return [];
  }
};

// Function to select meals that match calorie requirements
const selectMeals = (meals, mealTypes, totalCalories, mealCount) => {
  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the meals to introduce randomness
  const shuffledMeals = shuffleArray(meals);

  // Group meals by type
  const mealsByType = {};
  for (const meal of shuffledMeals) {
    if (!mealsByType[meal.course]) {
      mealsByType[meal.course] = [];
    }
    mealsByType[meal.course].push(meal);
  }

  // Function to find valid combinations based on meal types and total calories
  const findCombination = (types, selected, currentCalories) => {
    if (selected.length === mealCount) {
      return currentCalories >= totalCalories * 0.9 &&
        currentCalories <= totalCalories * 1.1
        ? selected
        : null;
    }

    if (types.length === 0) {
      return null;
    }

    const type = types[0];
    const remainingTypes = types.slice(1);

    if (!mealsByType[type] || mealsByType[type].length === 0) {
      return null; // Not enough meals of the required type
    }

    for (const meal of mealsByType[type]) {
      const newSelected = [...selected, meal];
      const newCalories = currentCalories + meal.calories;
      const result = findCombination(remainingTypes, newSelected, newCalories);
      if (result) {
        return result;
      }
    }

    return null;
  };

  // Try to find a valid combination starting from the shuffled meals
  const validCombination = findCombination(mealTypes, [], 0);

  if (validCombination) {
    return validCombination;
  }

  // If no valid combination found, return null
  return null;
};

const postMeals = async (req, res) => {
  try {
    res.status(201).json(req.body);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in posting data", error: error.message });
  }
};

const updateMealID = async (req, res) => {
  try {
    const id = req.params.id;
    res
      .status(201)
      .json({ message: `Meal(${id}) has been updated.`, body: req.body });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in updating data", error: error.message });
  }
};

module.exports = {
  getAllMeals,
  getOneMealByID,
  postMeals,
  updateMealID,
  getMealsByCaloriesAndCount,
};
