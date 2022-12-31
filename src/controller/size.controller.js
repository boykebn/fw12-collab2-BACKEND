const {
    getAllSize,
    createSize,
    getSizeById,
    updateSize,
    deleteSize,
  } = require("../models/size.model");
  const errorHandler = require("../helper/errorHandler.helper");
  
  exports.getAllSize = async (req, res) => {
    try {
      const allSize = await getAllSize();
      res.status(200).json({
        success: true,
        message: "All Size retrieved successfully",
        results: allSize,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.createSize = async (req, res) => {
    try {
      const size = await createSize(req.body);
      res.status(200).json({
        success: true,
        message: "Size created successfully",
        results: size,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.getSizeById = async (req, res) => {
    try {
      const size = await getSizeById(req.params.id);
      res.status(200).json({
        success: true,
        message: "Size retrieved successfully",
        results: size,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.updateSize = async (req, res) => {
    try {
      const size = await updateSize(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "Size updated successfully",
        results: size,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.deleteSize = async (req, res) => {
    try {
      const size = await deleteSize(req.params.id);
      res.status(200).json({
        success: true,
        message: "Size deleted successfully",
        results: size,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  