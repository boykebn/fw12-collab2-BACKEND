const status = require("express").Router();
const {
  getAllStatus,
  createStatus,
  getStatusById,
  updateStatus,
  deleteStatus,
} = require("../controller/status.controller");

status.get("/", getAllStatus);
status.get("/:id", getStatusById);
status.post("/", createStatus);
status.patch("/:id", updateStatus);
status.delete("/:id", deleteStatus);

module.exports = status;
