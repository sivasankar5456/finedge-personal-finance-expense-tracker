
const Budget = require("../models/BudgetModel");

const setBudget = async (userId, data) => {
  const { month, year, spendingLimit, savingsTarget } = data;

  const budget = await Budget.findOneAndUpdate(
    { userId, month, year },
    { spendingLimit, savingsTarget },
    { new: true, upsert: true }
  );

  return budget;
};

const getBudget = async (userId, month, year) => {
  return Budget.findOne({ userId, month, year });
};

module.exports = {
  setBudget,
  getBudget
};