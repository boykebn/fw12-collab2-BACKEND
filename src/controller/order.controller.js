const {
    readAllOrders,
    readOrder,
    createOrder,
    updateOrder,
    deleteOrder,
  } = require("../models/order.model");
  const errorHandler = require("../helper/errorHandler.helper");
  
  exports.getAllOrders = async (req, res) => {
    try {
      const Orders = await readAllOrders();
      res.status(200).json({
        success: true,
        message: "All Orders retrieved successfully",
        results: Orders,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.getOrderById = async (req, res) => {
    try {
      const Order = await readOrder(req.params.id);
      res.status(200).json({
        success: true,
        message: "Order retrieved successfully",
        results: Order,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.createOrder = async (req, res) => {
    try {
      const Order = await createOrder(req.body);
      res.status(200).json({
        success: true,
        message: "Order created successfully",
        results: Order,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.updateOrder = async (req, res) => {
    try {
      const Order = await updateOrder(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "Order updated successfully",
        results: Order,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.deleteOrder = async (req, res) => {
    try {
      const Order = await deleteOrder(req.params.id);
      res.status(200).json({
        success: true,
        message: "Order deleted successfully",
        results: Order,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  