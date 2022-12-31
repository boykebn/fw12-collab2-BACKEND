const errorHandler = (error, res) => {
  console.log(error);
  if (error.message.includes(' unique constraint "users_email_unique"') || error.message.includes(`"users_email_key"`)) {
    return res.status(400).json({
      success: false,
      message: "Email already used",
    });
  }
  if (error.message.includes(' unique constraint "users_phonenumber_unique"')|| error.message.includes(`users_phoneNumber_key`)) {
    return res.status(400).json({
      success: false,
      message: "Phone number already used",
    });
  }
  if (error.message.includes("backend error:")) {
    if (error.message.includes("code_expired")) {
      return res.status(400).json({
        succes: false,
        message: "Code expired!",
      });
    }
    if (error.message.includes("notfound_code_request")) {
      return res.status(400).json({
        succes: false,
        message: "Request not founded",
      });
    }
  }
  return res.status(500).json({
    succes: false,
    message: "Something happend in our backend",
    error: error
  });
};

module.exports = errorHandler