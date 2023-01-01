const errorHandler = require("../helper/errorHandler.helper");
const {
  selectUserByEmail,
  updateUser,
  createUsers,
  createUser,
} = require("../models/users.model");
// const {
//   createForgotPassword,
//   selectUserByEmailAndCode,
//   deleteForgotPassword,
// } = require("../models/forgotPasswords.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const user = await selectUserByEmail(req.body.email);
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY
    );
    if (user.role == 1) {
      if (await argon.verify(user.password, req.body.password)) {
        return res.status(200).json({
          success: true,
          message: "Success Login User",
          results: {
            token,
          },
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Wrong Email or Password",
        });
      }
    } else if (user.role == 2) {
      if (await argon.verify(user.password, req.body.password)) {
        return res.status(200).json({
          success: true,
          message: "Success Login Admin",
          results: {
            token,
          },
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Wrong Email or Password",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "This email is not registered",
      });
    }
  } catch (err) {
    if (err) errorHandler(err, res);
  }
};

const register = async (req, res) => {
  try {
    req.body.password = await argon.hash(req.body.password);
    const user = await createUsers(req.body);
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      success: true,
      message: "Register Success",
      results: {
        token,
      },
    });
  } catch (error) {
    if (error) errorHandler(error, res);
  }
};

// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const users = await selectUserByEmail(email);
//     if (users) {
//       const data = {
//         email,
//         userId: users.id,
//         code: Math.ceil(Math.random() * 90000 + 10000),
//       };
//       await createForgotPassword(data);
//       res.status(200).json({
//         success: true,
//         message: "Reset password has been requested.",
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//   } catch (error) {
//     if (error) errorHandler(error, res);
//   }
// };

// const resetPassword = async (req, res) => {
//   try {
//     const { password, confirmPassword } = req.body;
//     if (password === confirmPassword) {
//       const users = await selectUserByEmailAndCode(req.body);
//       if (users) {
//         const newPassword = await argon.hash(req.body.password);
//         const reset = await updateUser(users.userId, { password: newPassword });
//         if (reset) {
//           await deleteForgotPassword(users.id);
//           return res.status(200).json({
//             success: true,
//             message: "Password updated, please re-login.",
//           });
//         }
//       } else {
//         return res.status(400).json({
//           success: false,
//           message: "Email or code is not valid",
//         });
//       }
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Password and confirm password must be match",
//       });
//     }
//   } catch (error) {
//     if (error) errorHandler(error, res);
//   }
// };

module.exports = {
  login,
  register,
  // forgotPassword,
  // resetPassword,
};
