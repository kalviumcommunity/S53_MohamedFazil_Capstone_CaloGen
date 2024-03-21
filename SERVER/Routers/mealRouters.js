const express = require("express");
const {
  getAllMeals,
  getOneMealByID,
  postMeals,
} = require("../Controllers/mealControllers");
const mealRouter = express.Router();

mealRouter.get("/all", getAllMeals);
mealRouter.get("/one/:id", getOneMealByID);
mealRouter.post("/post",postMeals)

module.exports = mealRouter;
