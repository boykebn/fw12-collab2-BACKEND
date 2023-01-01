const History = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory,
} = require("../controller/history.controller");

History.get("/", getAllHistory);
History.get("/:id", getHistoryById);
History.post("/", createHistory);
History.patch("/:id", updateHistory);
History.delete("/:id", deleteHistory);

module.exports = History;
