const routers = require("express").Router();

routers.use("/size", require("./size.router"));



module.exports = routers