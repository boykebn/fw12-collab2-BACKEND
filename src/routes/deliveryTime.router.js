const deliveryTime = require("express").Router();
const {
  getAllDeliveryTime,
  getDeliveryTimeById,
  createDeliveryTime,
  updateDeliveryTime,
  deleteDeliveryTime,
} = require("../controller/deliveryTime.controller");

deliveryTime.get("/", getAllDeliveryTime);
deliveryTime.get("/:id", getDeliveryTimeById);
deliveryTime.post("/", createDeliveryTime);
deliveryTime.patch("/:id", updateDeliveryTime);
deliveryTime.delete("/:id", deleteDeliveryTime);

module.exports = deliveryTime;
