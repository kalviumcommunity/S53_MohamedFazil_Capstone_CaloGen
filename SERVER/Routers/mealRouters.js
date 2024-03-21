const express = require("express");
const {
  getAllMeals,
  getOneMealByID,
  postMeals,
  updateMealID,
} = require("../Controllers/mealControllers");
const mealRouter = express.Router();

mealRouter.get("/all", getAllMeals);
mealRouter.get("/one/:id", getOneMealByID);
mealRouter.post("/post", postMeals);
mealRouter.put("/put/:id", updateMealID);

module.exports = mealRouter;
