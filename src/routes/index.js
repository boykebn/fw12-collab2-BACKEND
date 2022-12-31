const routers = require("express").Router();

routers.use("/product", require("./product.router"));
routers.use("/size", require("./size.router"));
routers.use("/category", require("./category.router"));
routers.use("/productCategory", require("./productCategory.router"));
routers.use("/deliveryTime", require("./deliveryTime.router"));
routers.use("/status", require("./status.router"));
routers.use("/users", require("./users.router"));

module.exports = routers
