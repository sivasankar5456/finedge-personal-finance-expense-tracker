const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  //  Allow only email & password
  const allowedFields = ["email", "password"];
  const requestFields = Object.keys(req.body);

  const hasExtraFields = requestFields.some(
    (field) => !allowedFields.includes(field)
  );

  if (hasExtraFields) {
    return res.status(400).json({
      success: false,
      message: "Only email and password are allowed"
    });
  }

  //  Required check
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  //  Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof email !== "string" || !emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format"
    });
  }

  //  Password validation
  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters"
    });
  }

  next();
};

module.exports = validateLogin;