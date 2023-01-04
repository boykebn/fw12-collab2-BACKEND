const order = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderedProductOnProcess,

} = require("../controller/order.controller");
const authMiddleware = require("../middleware/auth.middleware");

order.get("/", getAllOrders);
order.get("/:id", getOrderById);
order.post("/", createOrder);
order.patch("/:id", updateOrder);
order.delete("/:id", deleteOrder);

module.exports = order;
