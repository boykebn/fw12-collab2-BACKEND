const Promo = require("express").Router();
const {
    getAllPromo,
    createPromo,
    getPromoById,
    updatePromo,
    deletePromo,
} = require("../controller/promo.controller");
const authMiddleware = require('../middleware/auth.middleware')
const {uploadMiddleware} = require("../middleware/upload.middleware")

Promo.post("/add", authMiddleware, uploadMiddleware, createPromo)
Promo.patch("/edit/:id", authMiddleware, uploadMiddleware, updatePromo)

Promo.get("/", getAllPromo);
Promo.post("/", createPromo);
Promo.get("/:id", getPromoById);
Promo.patch("/:id", updatePromo);
Promo.delete("/:id", deletePromo);



module.exports = Promo;
