const History = require("express").Router();
const {
  getHistoryByUserId,
  deleteHistory
} = require("../controller/history.controller");
const authMiddleware = require('../middleware/auth.middleware')

History.get("/:id", authMiddleware, getHistoryByUserId);
History.delete('/:id', authMiddleware, deleteHistory)

module.exports = History;
