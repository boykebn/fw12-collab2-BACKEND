const Users = require("express").Router();
const {
  getAllUsers,
  createUsers,
  getUsersById,
  updateUsers,
  deleteUsers,
} = require("../controller/users.controller");

Users.get("/", getAllUsers);
Users.get("/:id", getUsersById);
Users.post("/", createUsers);
Users.patch("/:id", updateUsers);
Users.delete("/:id", deleteUsers);

module.exports = Users;
