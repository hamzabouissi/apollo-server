const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
  },
  mealtype: {
    type: String,
  },
});
const Meal = mongoose.model('Meal',MealSchema)
module.exports = Meal;