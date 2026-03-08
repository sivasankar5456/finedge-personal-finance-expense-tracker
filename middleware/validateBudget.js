const AppError = require("../utils/AppError");

const validateBudget = (req, res, next) => {
  const { month, year, spendingLimit, savingsTarget } = req.body;

  if (!month) return next(new AppError("Month is required", 400));
  if (month < 1 || month > 12)
    return next(new AppError("Month must be between 1 and 12", 400));

  if (!year) return next(new AppError("Year is required", 400));

  if (spendingLimit === undefined)
    return next(new AppError("Spending limit is required", 400));

  if (spendingLimit < 0)
    return next(new AppError("Spending limit cannot be negative", 400));

  if (savingsTarget === undefined)
    return next(new AppError("Savings target is required", 400));

  if (savingsTarget < 0)
    return next(new AppError("Savings target cannot be negative", 400));

  if (savingsTarget > spendingLimit)
    return next(
      new AppError("Savings target cannot exceed spending limit", 400)
    );

  next();
};

module.exports = validateBudget;