const mongoose = require("mongoose");

const OrderItemsSchema = new mongoose.Schema({
  quantity: {
    type: Number,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
  },
});
const OrderItems = mongoose.model('OrderItems',OrderItemsSchema)
module.exports = OrderItems;