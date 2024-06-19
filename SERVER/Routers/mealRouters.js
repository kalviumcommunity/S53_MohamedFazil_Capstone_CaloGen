const express = require("express");
const {
  getAllMeals,
  getOneMealByID,
  postMeals,
  updateMealID,
  getMealsByCaloriesAndCount
} = require("../Controllers/mealControllers");
const mealRouter = express.Router();

mealRouter.get("/", getAllMeals);
mealRouter.get("/:id", getOneMealByID);
mealRouter.post("/generate-meals", getMealsByCaloriesAndCount);
mealRouter.post("/", postMeals);
mealRouter.put("/:id", updateMealID);

module.exports = mealRouter;
