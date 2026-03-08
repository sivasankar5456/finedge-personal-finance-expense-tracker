const AppError = require("../utils/AppError");

const ALL_WORLD_CURRENCIES = require("../config/currencies");

/* =========================
   REGISTER VALIDATION
========================= */
exports.validateRegister = (req, res, next) => {
  const { name, email, password, currency } = req.body;

  const allowedFields = ["name", "email", "password", "currency"];
  const requestFields = Object.keys(req.body);

  const hasExtraFields = requestFields.some(
    (field) => !allowedFields.includes(field)
  );

  if (hasExtraFields) {
    return next(
      new AppError("Only name, email, password and currency are allowed", 400)
    );
  }

  if (!name || !email || !password) {
    return next(new AppError("Name, email and password are required", 400));
  }

  /* NAME VALIDATION */
  if (typeof name !== "string" || name.trim().length < 3) {
    return next(new AppError("Name must be at least 3 characters", 400));
  }

  /* EMAIL VALIDATION */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof email !== "string" || !emailRegex.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  /* PASSWORD VALIDATION */
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

  /* CURRENCY VALIDATION (OPTIONAL FIELD) */
  if (currency !== undefined && currency !== null) {

    if (typeof currency !== "string") {
      return next(new AppError("Currency must be a valid string", 400));
    }

    const normalizedCurrency = currency.trim().toUpperCase();

    if (normalizedCurrency.length === 0) {
      return next(new AppError("Currency cannot be empty", 400));
    }

    if (!ALL_WORLD_CURRENCIES.includes(normalizedCurrency)) {
      return next(
        new AppError(
          `${currency} is not a valid ISO-4217 currency code`,
          400
        )
      );
    }

    req.body.currency = normalizedCurrency; // normalize currency
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



// /* =========================
//    REGISTER VALIDATION
// ========================= */
// exports.validateRegister = (req, res, next) => {
//   const { name, email, password } = req.body;

//   const allowedFields = ["name", "email", "password"];
//   const requestFields = Object.keys(req.body);

//   const hasExtraFields = requestFields.some(
//     (field) => !allowedFields.includes(field)
//   );

//   if (hasExtraFields) {
//     return next(new AppError("Only name, email and password are allowed", 400));
//   }

//   if (!name || !email || !password) {
//     return next(new AppError("All fields are required", 400));
//   }

//   if (typeof name !== "string" || name.trim().length < 3) {
//     return next(new AppError("Name must be at least 3 characters", 400));
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (typeof email !== "string" || !emailRegex.test(email)) {
//     return next(new AppError("Invalid email format", 400));
//   }

//   // Strong password validation
//   const strongPasswordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

//   if (!strongPasswordRegex.test(password)) {
//     return next(
//       new AppError(
//         "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
//         400
//       )
//     );
//   }

//   next();
// };

