
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  // Allow only required fields
  const allowedFields = ["name", "email", "password"];
  const requestFields = Object.keys(req.body);

  const hasExtraFields = requestFields.some(
    (field) => !allowedFields.includes(field)
  );

  if (hasExtraFields) {
    return res.status(400).json({
      success: false,
      message: "Only name, email and password are allowed"
    });
  }

  // Required check
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  // Name validation
  if (typeof name !== "string" || name.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: "Name must be at least 3 characters"
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof email !== "string" || !emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format"
    });
  }

  // Password validation BEFORE hashing
  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters"
    });
  }

  next();
};

module.exports = validateRegister;
