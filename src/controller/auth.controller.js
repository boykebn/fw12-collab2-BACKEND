const {selectUserByEmail} = require("../models/users.model");

const login = (req, res) => {
  selectUserByEmail(req.body.email, (err, { rows }) => {
    console.log(rows)
    if (rows.length) {
      const [user] = rows;
      if (req.body.password === user.password) {
        const token = jwt.sign(
          { id: user.id},
          "backend-secret"
        );
        return res.status(200).json({
          success: true,
          message: "login success",
          result: { token },
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Wrong password or email",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Email not registered",
      });
    }
  });
};

module.exports =  login ;
