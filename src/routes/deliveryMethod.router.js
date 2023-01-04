const deliveryMethod = require("express").Router();
const {
  getAllDeliveryMethod,
} = require("../controller/deliveryMethod.controller");

deliveryMethod.get("/", getAllDeliveryMethod);

module.exports = deliveryMethod;
