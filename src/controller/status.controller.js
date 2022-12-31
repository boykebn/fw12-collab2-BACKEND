const {
    getAllStatus,
    createStatus,
    getStatusById,
    updateStatus,
    deleteStatus,
  } = require("../models/status.model");
  const errorHandler = require("../helper/errorHandler.helper");
  
  exports.getAllStatus = async (req, res) => {
    try {
      const allStatus = await getAllStatus();
      res.status(200).json({
        success: true,
        message: "All Status retrieved successfully",
        results: allStatus,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.createStatus = async (req, res) => {
    try {
      const Status = await createStatus(req.body);
      res.status(200).json({
        success: true,
        message: "Status created successfully",
        results: Status,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.getStatusById = async (req, res) => {
    try {
      const Status = await getStatusById(req.params.id);
      res.status(200).json({
        success: true,
        message: "Status retrieved successfully",
        results: Status,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.updateStatus = async (req, res) => {
    try {
      const Status = await updateStatus(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        message: "Status updated successfully",
        results: Status,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.deleteStatus = async (req, res) => {
    try {
      const Status = await deleteStatus(req.params.id);
      res.status(200).json({
        success: true,
        message: "Status deleted successfully",
        results: Status,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  