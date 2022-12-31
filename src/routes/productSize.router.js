const productSize = require("express").Router();
const {
  getAllProductSize,
  createProductSize,
  getProductSizeById,
  updateProductSize,
  deleteProductSize,
} = require("../controller/productSize.controller");

productSize.get("/", getAllProductSize);
productSize.get("/:id", getProductSizeById);
productSize.post("/", createProductSize);
productSize.patch("/:id", updateProductSize);
productSize.delete("/:id", deleteProductSize);

module.exports = productSize;
