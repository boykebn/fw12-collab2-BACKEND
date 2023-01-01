const routers = require("express").Router();

routers.use("/product", require("./product.router"));
routers.use("/size", require("./size.router"));
routers.use("/category", require("./category.router"));
routers.use("/productCategory", require("./productCategory.router"));
routers.use("/deliveryTime", require("./deliveryTime.router"));
routers.use("/status", require("./status.router"));
routers.use("/users", require("./users.router"));
routers.use("/productSize", require("./productSize.router"));
routers.use("/paymentMethod", require("./paymentMethod.router"));
routers.use("/promo", require("./promo.router"));
routers.use("/order", require("./order.router"));
routers.use("/history", require("./history.router"));



routers.use('/auth', require('./auth.router') )


module.exports = routers
