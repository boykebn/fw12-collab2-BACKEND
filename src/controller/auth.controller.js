const errorHandler = require("../helper/errorHandler.helper");
const {
  createForgotPassword,
  readForgotPasswordByEmailAndCode,
  deleteForgotPassword,
} = require("../models/forgotPassword");
const {
  selectUserByEmail,
  updateUsers,
  createUsers,
} = require("../models/users.model");
const { mailOptions, transport } = require("../helper/mail.helper");
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

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await selectUserByEmail(email);
    if (user) {
      const code = String(Math.ceil(Math.random() * 90000 + 10000)).padEnd(
        6,
        "0"
      );
      const data = {
        email,
        userId: user.id,
        code,
      };
      const mailer = await transport();
      await mailer.sendMail(mailOptions(email, code));
      const requstResetPassword = await createForgotPassword(data);
      return res.status(200).json({
        success: true,
        message: "Reset password has been requested",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Request failed, user doesn't exist",
      });
    }
  } catch (error) {
    return errorHandler(error, res);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password === confirmPassword) {
      const resetRequest = await readForgotPasswordByEmailAndCode(req.body);
      if (resetRequest) {
        if (
          new Date(resetRequest.createdAt).getTime() + 15 * 60 * 1000 <
          new Date().getTime()
        ) {
          throw Error("Code Expired");
        }

        const data = {
          password: await argon.hash(password),
        };

        const user = await updateUsers(data, resetRequest.userId);
        const forgotPassword = await deleteForgotPassword(resetRequest.id);
        return res.status(200).json({
          success: true,
          message: "Password success updated, please relogin",
        });
      } else {
        throw Error("Request not found");
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Password and confirm password not match",
      });
    }
  } catch (error) {
    return errorHandler(error, res);
  }
};

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
};
