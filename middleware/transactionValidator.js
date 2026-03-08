const AppError = require("../utils/AppError");

/* =========================
   CREATE TRANSACTION
========================= */

exports.validateCreateTransaction = (req, res, next) => {
  const { type, category, amount, note, date } = req.body;

  const allowedFields = ["type", "category", "amount", "note", "date"];
  const requestFields = Object.keys(req.body);

  const hasExtraFields = requestFields.some(
    (field) => !allowedFields.includes(field)
  );

  if (hasExtraFields) {
    return next(new AppError("Invalid fields in request body", 400));
  }

  if (!type || !category || amount === undefined) {
    return next(
      new AppError("Type, category and amount are required", 400)
    );
  }

  if (!["income", "expense"].includes(type)) {
    return next(
      new AppError("Transaction type must be income or expense", 400)
    );
  }

  if (typeof category !== "string" || category.trim().length < 2) {
    return next(
      new AppError("Category must be at least 2 characters", 400)
    );
  }

  if (typeof amount !== "number" || amount <= 0) {
    return next(new AppError("Amount must be a positive number", 400));
  }

  if (note && typeof note !== "string") {
    return next(new AppError("Note must be a string", 400));
  }

  if (date && isNaN(new Date(date))) {
    return next(new AppError("Invalid date format", 400));
  }

  next();
};

/* =========================
   UPDATE TRANSACTION
========================= */

exports.validateUpdateTransaction = (req, res, next) => {
  const { type, category, amount, note, date } = req.body;

  if (type && !["income", "expense"].includes(type)) {
    return next(
      new AppError("Transaction type must be income or expense", 400)
    );
  }

  if (category && category.trim().length < 2) {
    return next(
      new AppError("Category must be at least 2 characters", 400)
    );
  }

  if (amount !== undefined && (typeof amount !== "number" || amount <= 0)) {
    return next(new AppError("Amount must be a positive number", 400));
  }

  if (date && isNaN(new Date(date))) {
    return next(new AppError("Invalid date format", 400));
  }

  next();
};