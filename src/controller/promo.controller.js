const errorHandler = require("../helper/errorHandler.helper");
const {
  getAllPromo,
  createPromo,
  getPromoById,
  updatePromo,
  deletePromo,
} = require("../models/promo.model");
const fs = require("fs");
const fm = require("fs-extra");
const cloudinary = require("../middleware/upload.middleware");

exports.getAllPromo = async (req, res) => {
  try {
    const allPromo = await getAllPromo();
    res.status(200).json({
      success: true,
      message: "All promo retrived successfully",
      results: allPromo,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.createPromo = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.path;
    }
    const Promo = await createPromo(req.body);
    res.status(200).json({
      success: true,
      message: "Promo created successfully",
      results: Promo,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.getPromoById = async (req, res) => {
  try {
    const Promo = await getPromoById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Promo retrieved successfully",
      results: Promo,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};

exports.updatePromo = async (req, res) => {
  try {
    if (req.file) {
      await cloudinary?.uploader?.destroy(req.file.filename);
      req.body.picture = req.file.path;
    }
    const Promo = await updatePromo(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Promo updated successfully",
      results: Promo,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};
//   try {
//     const Promo = await updatePromo(req.params.id, req.body);

//     res.status(200).json({
//       success: true,
//       message: "Promo updated successfully",
//       results: Promo,
//     });
//   } catch (error) {
//     if (error) return errorHandler(error, res);
//   }
// };

exports.deletePromo = async (req, res) => {
  try {
    const Promo = await deletePromo(req.params.id);
    res.status(200).json({
      success: true,
      message: "Promo deleted successfully",
      results: Promo,
    });
  } catch (error) {
    if (error) return errorHandler(error, res);
  }
};
