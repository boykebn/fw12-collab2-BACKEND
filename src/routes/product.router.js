const product = require("express").Router();
const {
  getAllProducts,
  getProductById,
  getProductByIdAndSize,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");
const authMiddleware = require("../middleware/auth.middleware")
const uploadMiddleware = require("../middleware/upload.middleware")

product.post("/add", authMiddleware, uploadMiddleware, createProduct)

product.get("/", getAllProducts);
product.get("/category/:category", getProductsByCategory);
product.get("/details/:productId", getProductByIdAndSize);
product.get("/:id", getProductById);
product.post("/", createProduct);
product.patch("/:id", updateProduct);
product.delete("/:id", deleteProduct);

module.exports = product;
