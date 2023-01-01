const Order = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controller/order.controller");

Order.get("/", getAllOrders);
Order.get("/:id", getOrderById);
Order.post("/", createOrder);
Order.patch("/:id", updateOrder);
Order.delete("/:id", deleteOrder);

module.exports = Order;
