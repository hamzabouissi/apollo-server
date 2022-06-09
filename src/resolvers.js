const Meal = require("./models/Meal.model");
const Order = require("./models/Order.model");
const OrderItems = require("./models/OrderItems.model");

// const meals = [
//   { id: 1, title: "Tom", description: "Coleman", price: 10, photo: "test",mealtype: "Plats" },
//   { id: 2, title: "Sashko", description: "Stubailo", price: 10, photo: "test", mealtype: "Entree"  },
//   { id: 3, title: "Mikhail", description: "Novikov", price: 10, photo: "test", mealtype: "Desserts" },
//   { id: 4, title: "Mikhail", description: "Novikov", price: 10, photo: "test", mealtype: "Plats" },
// ];

const resolvers = {
  Query: {
    meals: async () => {
      return Meal.find();
    },
    meal: async (_root, { id }, _context, _info) => {
      return Meal.findById(id);
    },
    mealsByType: async (_root, { mealtype }, _context, _info) => {
      return Meal.find({ mealtype: mealtype });
    },

    // Order
    orders: async () => {
      return Order.find();
    },
    order: async (_root, { id }, _context, _info) => {
      return Order.findById(id);
    },
    orderItems: async (_root, { id }, _context, _info) => {
      return OrderItems.find({ orderId: id }).populate("meal");
    },
  },
  Mutation: {
    createMeal: async (parent, args, _context, _info) => {
      const { title, description, price, photo, mealtype } = args.meal;
      const meal = new Meal({ title, description, price, photo, mealtype });
      await meal.save();
      return meal;
    },
    deleteMeal: async (parent, { id }, _context, _info) => {
      const meal = await Meal.findByIdAndDelete(id);
      return "OK";
    },

    // Order

    createOrder: async (parent, args, _context, _info) => {
      const order = new Order();
      await order.save();
      return order;
    },
    deleteOrder: async (parent, { id }, _context, _info) => {
      const meal = Order.findByIdAndDelete(id);
      return "OK";
    },
    addOrderItem: async (parent, args, _context, _info) => {
      const { quantity, mealId, orderId } = args.item;
      const order = await Order.findById(orderId).exec();
      const meal = await Meal.findById(mealId).exec();
      const orderItem = new OrderItems({
        quantity: quantity,
        meal: meal._id,
        order: order._id,
      });
      orderItem.save();
      
      return orderItem.populate("meal");
    },
    deleteOrderItem: async (parent, { id }, _context, _info) => {
      console.log(id);
      const meal = OrderItems.findByIdAndDelete(id);
      return "OK";
    },
  },
};

module.exports = resolvers;
