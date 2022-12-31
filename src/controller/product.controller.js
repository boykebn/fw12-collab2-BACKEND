const { readAllProducts, readProduct, createProduct, updateProduct, deleteProduct} = require('../models/product.model')
const errorHandler = require('../helper/errorHandler.helper')

exports.getAllProducts = async (req, res) => {
    try {
        const products = await readAllProducts()
        res.status(200).json({
            success: true,
            message: "All products retrieved successfully",
            results: products,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await readProduct(req.params.id)
        res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            results: product,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.createProduct = async (req, res) => {
    try {
      const product = await createProduct(req.body);
      res.status(200).json({
        success: true,
        message: "Product created successfully",
        results: Product,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  

exports.updateProduct = async (req, res) => {
    try {
        const product = await updateProduct(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            results: product,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await deleteProduct(req.params.id)
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            results: product,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}