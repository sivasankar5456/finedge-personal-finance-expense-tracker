const AppError = require("../utils/AppError");

/* =========================
   REGISTER VALIDATION
========================= */
exports.validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  const allowedFields = ["name", "email", "password"];
  const requestFields = Object.keys(req.body);

  const hasExtraFields = requestFields.some(
    (field) => !allowedFields.includes(field)
  );

  if (hasExtraFields) {
    return next(new AppError("Only name, email and password are allowed", 400));
  }

  if (!name || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  if (typeof name !== "string" || name.trim().length < 3) {
    return next(new AppError("Name must be at least 3 characters", 400));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof email !== "string" || !emailRegex.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  // Strong password validation
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!strongPasswordRegex.test(password)) {
    return next(
      new AppError(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
        400
      )
    );
  }

  next();
};

/* =========================
   LOGIN VALIDATION
========================= */
exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const allowedFields = ["email", "password"];
  const requestFields = Object.keys(req.body);

  const hasExtraFields = requestFields.some(
    (field) => !allowedFields.includes(field)
  );

  if (hasExtraFields) {
    return next(new AppError("Only email and password are allowed", 400));
  }

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof email !== "string" || !emailRegex.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  if (typeof password !== "string" || password.length < 8) {
    return next(new AppError("Invalid credentials", 400));
  }

  next();
};