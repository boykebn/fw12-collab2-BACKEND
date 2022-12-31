const routers = require("express").Router();

routers.use("/product", require("./product.router"));
routers.use("/size", require("./size.router"));
routers.use("/category", require("./category.router"));
routers.use("/productCategory", require("./productCategory.router"));

module.exports = routers