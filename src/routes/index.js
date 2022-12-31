const routers = require("express").Router();

routers.use("/product", require("./product.router"));
routers.use("/size", require("./size.router"));
routers.use("/category", require("./category.router"));
routers.use("/productCategory", require("./productCategory.router"));
routers.use("/deliveryTime", require("./deliveryTime.router"));
routers.use("/status", require("./status.router"));
<<<<<<< HEAD
routers.use("/users", require("./users.router"));

module.exports = routers
=======
routers.use("/users", require("./users.router"))
module.exports = routers;
>>>>>>> 66e9dd1698e7eb353b14f3700da5c058e327f342
