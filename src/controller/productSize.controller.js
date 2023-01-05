const {
    getAllProductSize,
    createProductSize,
    getProductSizeById,
    updateProductSize,
    deleteProductSize,
  } = require("../models/productSize.model");
  const errorHandler = require("../helper/errorHandler.helper");
  
  
  exports.getAllProductSize = async (req, res) => {
    try {
      const allProductSize = await getAllProductSize();
      res.status(200).json({
        success: true,
        message: "All ProductSize retrieved successfully",
        results: allProductSize,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.createProductSize = async (req, res) => {
    try {
      const ProductSize = await createProductSize(req.body);
      res.status(200).json({
        success: true,
        message: "ProductSize created successfully",
        results: ProductSize,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.getProductSizeById = async (req, res) => {
    try {
      const ProductSize = await getProductSizeById(req.params.id);
      res.status(200).json({
        success: true,
        message: "ProductSize retrieved successfully",
        results: ProductSize,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.updateProductSize = async (req, res) => {
    try {
      const ProductSize = await updateProductSize(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "ProductSize updated successfully",
        results: ProductSize,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.deleteProductSize = async (req, res) => {
    try {
      const ProductSize = await deleteProductSize(req.params.id);
      res.status(200).json({
        success: true,
        message: "ProductSize deleted successfully",
        results: ProductSize,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  