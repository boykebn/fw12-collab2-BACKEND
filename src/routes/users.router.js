const users = require("express").Router();
const {
    createUsers,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controller/users.controller");

users.post("/", createUsers);
users.get("/", getUsers);
users.get("/:id", getUserById);
users.patch("/:id", updateUser);
users.delete("/:id", deleteUser);

module.exports = users