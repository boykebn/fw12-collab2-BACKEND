const transaction = require("express").Router();
const authMiddleware = require('../middleware/auth.middleware')
const { createTransaction, payTransaction , getOrderedProductOnConfirm, getOrderedProductOnProcess, confirmTransaction} = require("../controller/order.controller")

transaction.get('/confirm', getOrderedProductOnConfirm)
transaction.get("/process", authMiddleware, getOrderedProductOnProcess);
transaction.post('/', authMiddleware,createTransaction)
transaction.patch('/pay/:orderId', authMiddleware,payTransaction)
transaction.patch('/confirm/:orderId', confirmTransaction)

module.exports = transaction