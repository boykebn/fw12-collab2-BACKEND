const {
    readAllHistory,
    readHistory,
    createHistory,
    updateHistory,
    deleteHistory,
  } = require("../models/history.model");
  const errorHandler = require("../helper/errorHandler.helper");
  
  exports.getAllHistory = async (req, res) => {
    try {
      const History = await readAllHistory();
      res.status(200).json({
        success: true,
        message: "All History retrieved successfully",
        results: History,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.getHistoryById = async (req, res) => {
    try {
      const History = await readHistory(req.params.id);
      res.status(200).json({
        success: true,
        message: "History retrieved successfully",
        results: History,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.createHistory = async (req, res) => {
    try {
      const History = await createHistory(req.body);
      res.status(200).json({
        success: true,
        message: "History created successfully",
        results: History,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.updateHistory = async (req, res) => {
    try {
      const History = await updateHistory(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "History updated successfully",
        results: History,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.deleteHistory = async (req, res) => {
    try {
      const History = await deleteHistory(req.params.id);
      res.status(200).json({
        success: true,
        message: "History deleted successfully",
        results: History,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  