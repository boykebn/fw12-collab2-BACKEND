const errorHandler = require("../helper/errorHandler.helper");
const { getUsersById, updateUsers } = require("../models/users.model");
const { countOrderPaidByUserId } = require("../models/order.model");
const fs = require("fs");
const fm = require("fs-extra");

exports.readProfile = async (req, res) => {
  try {
    const user = await getUsersById(req.userData.id);
    const order = await countOrderPaidByUserId(req.userData.id);
    user.totalOrder = order.rows[0].totalOrder;
    if (user) {
      return res.status(200).json({
        success: true,
        message: "profile user",
        results: user,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    return errorHandler(error, res);
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.path;
      await getUsersById(req.userData.id);
    }
    const updateUser = await updateUsers(req.body, req.userData.id);
    return res.status(200).json({
      success: true,
      message: "Profile updated",
      results: updateUser,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};
