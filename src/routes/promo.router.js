const Promo = require("express").Router();
const {
    getAllPromo,
    createPromo,
    getPromoById,
    updatePromo,
    deletePromo,
} = require("../controller/promo.controller");


Promo.get("/", getAllPromo);
Promo.post("/", createPromo);
Promo.get("/:id", getPromoById);
Promo.patch("/:id", updatePromo);
Promo.delete("/:id", deletePromo);


module.exports = Promo;
