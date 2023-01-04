const History = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory,
} = require("../controller/history.controller");
const {deleteOrderProduct} = require('../controller/orderedProduct.controller')

History.get("/", getAllHistory);
History.delete("/delete/:id", deleteOrderProduct);



History.get("/:id", getHistoryById);
History.post("/", createHistory);
History.patch("/:id", updateHistory);

module.exports = History;
