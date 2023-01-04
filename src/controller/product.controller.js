const {
  readAllProducts,
  readProduct,
  createProduct,
  updateProductAdmin,
  deleteProduct,
  readProductByCategory,
  readProductByIdAndSize
} = require("../models/product.model");
const {createDeliveryTime} = require("../models/deliveryTime.model")
const errorHandler = require("../helper/errorHandler.helper");
const { productPrice } = require("../models/productSize.model");
const {updateProductSizeAdmin} = require('../models/productSize.model')
const cloudinary = require('../middleware/upload.middleware')

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
      req.body.picture = req.file.path;
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

    const timeDelivery = {
      startHour: req.body.startHour,
      endHour: req.body.endHour,
      productId: addProduct.id
    }
    const addTimeDelivery = await createDeliveryTime(timeDelivery)

    const product = { ...addProduct, ...addPrice, ...addTimeDelivery };
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
    if (req.file) {
      if (req.file) {
        await cloudinary?.uploader?.destroy(req.file.filename);
        req.body.picture = req.file.path;
      }
      }
    const dataProduct = {
      name: req.body.name,
      description: req.body.description,
      stock: req.body.stock,
      picture: req.body.picture,
    };
    const updateProduct = await updateProductAdmin(req.params.id, dataProduct);
    const dataPrice = {
      price: req.body.price,
      sizeId: req.body.sizeId,
      productId: req.params.id,
      size: req.body.sizeId
    };
    const updatePrice = await updateProductSizeAdmin(updateProduct.id, dataPrice);
    const product = { ...updateProduct, ...updatePrice };
    
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
