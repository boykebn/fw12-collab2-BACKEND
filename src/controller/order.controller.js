const { readAllOrders, readOrder, createOrder, updateOrder, deleteOrder, readOrderedProductOnProcess, readOrderedProductOnConfirm } = require("../models/order.model");
const { createOrderedProduct } = require("../models/orderedProduct");
const errorHandler = require("../helper/errorHandler.helper");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await readAllOrders();
    res.status(200).json({
      success: true,
      message: "All Orders retrieved successfully",
      results: orders,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await readOrder(req.params.id);
    res.status(200).json({
      success: true,
      message: "Order retrieved successfully",
      results: order,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(200).json({
      success: true,
      message: "Order created successfully",
      results: order,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await updateOrder(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      results: order,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await deleteOrder(req.params.id);
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      results: order,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

// transaction CRUD

exports.createTransaction = async (req, res) => {
  try {
    req.body.status = "unpaid";
    req.body.userId = req.userData.id;
    const order = await createOrder(req.body);
    req.body.orderId = order.id;
    const orderedProduct = await createOrderedProduct(req.body);
    const transaction = { ...order, ...orderedProduct };
    return res.status(200).json({
      success: true,
      message: "Transaction success",
      results: transaction,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.getOrderedProductOnProcess = async (req, res) => {
  try {
    const order = await readOrderedProductOnProcess(req.userData.id);
    return res.status(200).json({
      success: true,
      message: "Ordered Product",
      results: order,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.payTransaction = async (req, res) => {
  try {
      req.body.status = 'paid'
      const order = await updateOrder(req.params.orderId, req.body)
      return res.status(200).json({
        success: true,
        message: 'Product Paid',
        results: order
      }) 
  } catch (error) {
    if(error) return errorHandler(error, res)
  }
}

exports.getOrderedProductOnConfirm = async (req, res) => {
  try {
    const order = await readOrderedProductOnConfirm();
    return res.status(200).json({
      success: true,
      message: "Ordered Product",
      results: order,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.confirmTransaction = async (req, res) => {
  try {
      req.body.status = 'done'
      const order = await updateOrder(req.params.orderId, req.body)
      return res.status(200).json({
        success: true,
        message: 'Product Paid',
        results: order
      }) 
  } catch (error) {
    if(error) return errorHandler(error, res)
  }
}
