const { deleteOrderedProduct } = require("../models/orderedProduct");
const errorHandler = require("../helper/errorHandler.helper");

exports.deleteOrderProduct = async (req, res) => {
  try {
    const orderHistory = await deleteOrderedProduct(req.params.id);
    res.status(200).json({
      success: true,
      message: "Order History deleted successfully",
      results: orderHistory,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};
