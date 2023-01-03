const {
  readAllProducts,
  readProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  readProductByCategory,
  readProductByIdAndSize,
} = require("../models/product.model");
const errorHandler = require("../helper/errorHandler.helper");
const { productPrice } = require("../models/productSize.model");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await readAllProducts();
    res.status(200).json({
      success: true,
      message: "All products retrieved successfully",
      results: products,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await readProduct(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      results: product,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.getProductByIdAndSize = async (req, res) => {
  try {
    const data = {
      productId: req.params.productId,
      sizeId: req.query.sizeId,
    };
    const product = await readProductByIdAndSize(data);
    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      results: product,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const product = await readProductByCategory(req.params.category);
    res.status(200).json({
      success: true,
      message: "List Products",
      results: product,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.createProduct = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.filename;
    }
    const productList = {
      name: req.body.name,
      description: req.body.description,
      stock: req.body.stock,
      picture: req.body.picture,
    };
    const addProduct = await createProduct(productList);

    const priceList = {
      sizeId: req.body.sizeId,
      price: req.body.price,
      productId: addProduct.id,
    };
    const addPrice = await productPrice(priceList);
    const product = { ...addProduct, ...addPrice };
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      results: product,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      results: product,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      results: product,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};
