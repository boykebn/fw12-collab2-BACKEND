const errorHandler = require("../helper/errorHandler.helper");
const { getUsersById } = require("../models/users.model");
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

exports.uploadProfilePicture = (req, res) => {
  try {
    if (req.file) {
      req.body.picture = req.file.filename;
      const user = getUsersById(req.userData.id);
      fm.ensureFile(require("path").join(process.cwd(), "/upload", user.picture), (error) => {
        if (error) {
          return errorHandler(error, res);
        }

        fs.rm(require("path").join(process.cwd(), "/upload", user.picture), (error) => {
          if (error) {
            return errorHandler(error, res);
          }
        });
      });
    }
    const updateUser = updateUsers(req.body, req.userData.id)
    return res.status(200).json({
        success: true,
        message: "Profile updated",
        results: updateUser
      });
  } catch (error) {
    return errorHandler(error, res)
  }
};
