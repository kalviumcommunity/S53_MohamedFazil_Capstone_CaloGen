const express = require("express");
const {
  getAllMeals,
  getOneMealByID,
  postMeals,
  updateMealID,
} = require("../Controllers/mealControllers");
const mealRouter = express.Router();

mealRouter.get("/", getAllMeals);
mealRouter.get("/:id", getOneMealByID);
mealRouter.post("/", postMeals);
mealRouter.put("/:id", updateMealID);

module.exports = mealRouter;
