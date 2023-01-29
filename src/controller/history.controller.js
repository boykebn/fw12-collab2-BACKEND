const { readAllHistory, readHistoryByUserId } = require("../models/history.model");
const { deleteOrder } = require('../models/order.model')
const { deleteOrderedProduct, readOrderedProduct } = require('../models/orderedProduct')

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

exports.getHistoryByUserId = async (req, res) => {
  try {
    const History = await readHistoryByUserId(req.params.id);
    res.status(200).json({
      success: true,
      message: "History retrieved successfully",
      results: History,
    });
  } catch (err) {
    if (err) return errorHandler(err, res);
  }
};

exports.deleteHistory = async (req, res) => {
  try{
    const orderedProduct = await deleteOrderedProduct(req.params.id)
    const order = await deleteOrder(req.params.id);
    res.status(200).json({
      success: true,
      message: "History retrieved successfully",
      results: {
        order,
        orderedProduct
      }
    });
  } catch(err) {
    if(err) return errorHandler(err, res)
  }
}