const users = require("express").Router();
const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controller/users.controller");

users.post("/", createUser);
users.get("/", getUsers);
users.get("/:id", getUserById);
users.patch("/:id", updateUser);
users.delete("/:id", deleteUser);

module.exports = users