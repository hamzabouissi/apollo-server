const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  total: {
    type: Number,
   
  },
});
const Order = mongoose.model('Order',OrderSchema)
module.exports = Order;