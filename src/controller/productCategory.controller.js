const { readAllProductCategory, readProductCategory, createProductCategory, updateProductCategory, deleteProductCategory} = require('../models/productCategory.model')
const errorHandler = require('../helper/errorHandler.helper')

exports.getAllProductCategory = async (req, res) => {
    try {
        const productCategory = await readAllProductCategory()
        res.status(200).json({
            success: true,
            message: "All product category retrieved successfully",
            results: productCategory,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.getProductCategoryById = async (req, res) => {
    try {
        const productCategory = await readProductCategory(req.params.id)
        res.status(200).json({
            success: true,
            message: "Product category retrieved successfully",
            results: productCategory,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.createProductCategory = async (req, res) => {
    try {
      const productCategory = await createProductCategory(req.body);
      res.status(200).json({
        success: true,
        message: "product category created successfully",
        results: productCategory,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  

exports.updateProductCategory = async (req, res) => {
    try {
        const productCategory = await updateProductCategory(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "Product category updated successfully",
            results: productCategory,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.deleteProductCategory = async (req, res) => {
    try {
        const productCategory = await deleteProductCategory(req.params.id)
        res.status(200).json({
            success: true,
            message: "Product category deleted successfully",
            results: productCategory,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}