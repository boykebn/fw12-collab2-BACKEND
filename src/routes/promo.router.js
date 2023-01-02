const Promo = require("express").Router();
const {
    getAllPromo,
    createPromo,
    getPromoById,
    updatePromo,
    deletePromo,
} = require("../controller/promo.controller");
const authMiddleware = require('../middleware/auth.middleware')



Promo.get("/", getAllPromo);
Promo.post("/", createPromo);
Promo.get("/:id", getPromoById);
Promo.patch("/:id", updatePromo);
Promo.delete("/:id", deletePromo);

Promo.post("/add", authMiddleware, createPromo)


module.exports = Promo;
