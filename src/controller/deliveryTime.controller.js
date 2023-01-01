const {
  readAllDeliveryTime,
  readDeliveryTime,
  createDeliveryTime,
  updateDeliveryTime,
  deleteDeliveryTime,
} = require("../models/deliveryTime.model");
const errorHandler = require("../helper/errorHandler.helper");

exports.getAllDeliveryTime = async (req, res) => {
  try {
    const deliveryTime = await readAllDeliveryTime();
    res.status(200).json({
      success: true,
      message: "All deliveryTime retrieved successfully",
      results: deliveryTime,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.getDeliveryTimeById = async (req, res) => {
  try {
    const deliveryTime = await readDeliveryTime(req.params.id);
    res.status(200).json({
      success: true,
      message: "deliveryTime retrieved successfully",
      results: deliveryTime,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.createDeliveryTime = async (req, res) => {
  try {
    const deliveryTime = await createDeliveryTime(req.body);
    res.status(200).json({
      success: true,
      message: "deliveryTime created successfully",
      results: deliveryTime,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.updateDeliveryTime = async (req, res) => {
  try {
    const deliveryTime = await updateDeliveryTime(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "deliveryTime updated successfully",
      results: deliveryTime,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.deleteDeliveryTime = async (req, res) => {
  try {
    const deliveryTime = await deleteDeliveryTime(req.params.id);
    res.status(200).json({
      success: true,
      message: "deliveryTime deleted successfully",
      results: deliveryTime,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};
