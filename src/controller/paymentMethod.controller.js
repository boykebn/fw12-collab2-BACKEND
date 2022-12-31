const {
    readAllPaymentMethods,
    readPaymentMethod,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
  } = require("../models/paymentMethod.model");
  const errorHandler = require("../helper/errorHandler.helper");
  
  exports.getAllPaymentMethods = async (req, res) => {
    try {
      const PaymentMethods = await readAllPaymentMethods();
      res.status(200).json({
        success: true,
        message: "All PaymentMethods retrieved successfully",
        results: PaymentMethods,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.getPaymentMethodById = async (req, res) => {
    try {
      const PaymentMethod = await readPaymentMethod(req.params.id);
      res.status(200).json({
        success: true,
        message: "PaymentMethod retrieved successfully",
        results: PaymentMethod,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.createPaymentMethod = async (req, res) => {
    try {
      const PaymentMethod = await createPaymentMethod(req.body);
      res.status(200).json({
        success: true,
        message: "PaymentMethod created successfully",
        results: PaymentMethod,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.updatePaymentMethod = async (req, res) => {
    try {
      const PaymentMethod = await updatePaymentMethod(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: "PaymentMethod updated successfully",
        results: PaymentMethod,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  
  exports.deletePaymentMethod = async (req, res) => {
    try {
      const PaymentMethod = await deletePaymentMethod(req.params.id);
      res.status(200).json({
        success: true,
        message: "PaymentMethod deleted successfully",
        results: PaymentMethod,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  