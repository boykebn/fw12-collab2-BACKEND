const {
    getAllDeliveryMethod,
  } = require("../models/deliveryMethod.model");
  const errorHandler = require("../helper/errorHandler.helper");
  
  exports.getAllDeliveryMethod = async (req, res) => {
    try {
      const allDeliveryMethod = await getAllDeliveryMethod();
      res.status(200).json({
        success: true,
        message: "All deliveryMethod retrieved successfully",
        results: allDeliveryMethod,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };