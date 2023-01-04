const routers = require("express").Router();
const authMiddleware = require('../middleware/auth.middleware')
const { createTransaction } = require("../controller/order.controller")

routers.use("/product", require("./product.router"));
routers.use("/size", require("./size.router"));
routers.use("/category", require("./category.router"));
routers.use("/productCategory", require("./productCategory.router"));
routers.use("/deliveryTime", require("./deliveryTime.router"));
routers.use("/deliveryMethod", require("./deliveryMethod.router"));
routers.use("/status", require("./status.router"));
routers.use("/users", require("./users.router"));
routers.use("/productSize", require("./productSize.router"));
routers.use("/paymentMethod", require("./paymentMethod.router"));
routers.use("/promo", require("./promo.router"));
routers.use("/order", require("./order.router"));
routers.use("/history", require("./history.router"));
routers.use("/chat", require("./chat.router"));
routers.use("/profile", authMiddleware, require("./profile.router"));
routers.use('/auth', require('./auth.router') )
routers.use('/transaction', require('./transaction.router'))


module.exports = routers
