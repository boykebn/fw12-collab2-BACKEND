const size = require("express").Router();
const {
  getAllSize,
  createSize,
  getSizeById,
  updateSize,
  deleteSize,
} = require("../controller/size.controller");

size.get("/", getAllSize);
size.get("/:id", getSizeById);
size.post("/", createSize);
size.patch("/:id", updateSize);
size.delete("/:id", deleteSize);

module.exports = size;
