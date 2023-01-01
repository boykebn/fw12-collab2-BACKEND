const {
    getAllUsers,
    createUsers,
    getUsersById,
    updateUsers,
    deleteUsers,
  } = require("../models/users.model");
  const errorHandler = require("../helper/errorHandler.helper");
  
  exports.getAllUsers = async (req, res) => {
    try {
      const allUsers = await getAllUsers();
      res.status(200).json({
        success: true,
        message: "All Users retrieved successfully",
        results: allUsers,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.createUsers = async (req, res) => {
    try {
      const Users = await createUsers(req.body);
      res.status(200).json({
        success: true,
        message: "Users created successfully",
        results: Users,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.getUsersById = async (req, res) => {
    try {
      const Users = await getUsersById(req.params.id);
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        results: Users,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.updateUsers = async (req, res) => {
    try {
      const Users = await updateUsers(
        req.body,
        req.params.id,
      );
      res.status(200).json({
        success: true,
        message: "Users updated successfully",
        results: Users,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.deleteUsers = async (req, res) => {
    try {
      const Users = await deleteUsers(req.params.id);
      res.status(200).json({
        success: true,
        message: "Users deleted successfully",
        results: Users,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  