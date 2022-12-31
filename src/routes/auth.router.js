const auth = require("express").Router();
const  login = require("../controller/auth.controller");

auth.post("/login", login);

module.exports = auth;
