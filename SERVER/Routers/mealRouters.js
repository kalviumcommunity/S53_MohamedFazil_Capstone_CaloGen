const express = require("express");
const {
  getAllMeals,
  getOneMealByID,
} = require("../Controllers/mealControllers");
const mealRouter = express.Router();

mealRouter.get("/all", getAllMeals);
mealRouter.get("/one/:id", getOneMealByID);

module.exports = mealRouter;
