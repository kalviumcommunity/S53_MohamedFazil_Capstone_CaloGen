const mongoose = require("mongoose");

const ingredientsSchema = mongoose.Schema({
  ingName: { type: String, required: true },
  ingMeasure: { type: String, required: true },
  rTags: { type: String },
});

const mealSchema = mongoose.Schema(
  {
    course: { type: String, required: true },
    img: { type: String, required: true },
    mealName: { type: String, required: true },
    calories: { type: Number, required: true },
    nutrients: [
      {
        name: { type: String, required: true },
        measure: { type: String, required: true },
      },
    ],
    pie_chart: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
        measure: { type: String, required: true },
      },
    ],
    prepTime: { type: String, required: true },
    cookingTime: { type: String, required: true },
    ingredients: { type: [ingredientsSchema], required: true },
    recipe: [{ type: String, required: true }],
    xReligions: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const MealModel = mongoose.model("Meal", mealSchema);

module.exports = MealModel;
