const paymentMethod = require("express").Router();
const {
  getAllPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} = require("../controller/paymentMethod.controller");

paymentMethod.get("/", getAllPaymentMethods);
paymentMethod.get("/:id", getPaymentMethodById);
paymentMethod.post("/", createPaymentMethod);
paymentMethod.patch("/:id", updatePaymentMethod);
paymentMethod.delete("/:id", deletePaymentMethod);

module.exports = paymentMethod;
