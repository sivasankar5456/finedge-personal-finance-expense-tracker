const Transaction = require("../models/transactionsModel");
const Budget = require("../models/BudgetModel");

exports.calculateSummary = async (userId, month, year) => {
  const filter = { userId };

  if (month && year) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    filter.date = { $gte: start, $lte: end };
  }

  const transactions = await Transaction.find(filter);

  let income = 0;
  let expense = 0;

  const categoryMap = {};

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += t.amount;
    } else {
      expense += t.amount;

      if (!categoryMap[t.category]) {
        categoryMap[t.category] = 0;
      }

      categoryMap[t.category] += t.amount;
    }
  });

  const balance = income - expense;

  const budget = await Budget.findOne({ userId, month, year });

  let remainingBudget = null;
  let savingsProgress = null;

  if (budget) {
    remainingBudget = budget.spendingLimit - expense;
    savingsProgress = balance - budget.savingsTarget;
  }

  return {
    income,
    expense,
    balance,
    budget,
    remainingBudget,
    savingsProgress,
    categoryBreakdown: categoryMap
  };
};

// const Transaction = require("../models/transactionsModel");
// const Budget = require("../models/BudgetModel");

// exports.calculateSummary = async (userId) => {
//   const transactions = await Transaction.find({ userId });

//   let income = 0;
//   let expense = 0;

//   transactions.forEach((t) => {
//     if (t.type === "income") income += t.amount;
//     else expense += t.amount;
//   });

//   const balance = income - expense;

//   const now = new Date();
//   const month = now.getMonth() + 1;
//   const year = now.getFullYear();

//   const budget = await Budget.findOne({ userId, month, year });

//   let remainingBudget = null;
//   let savingsProgress = null;

//   if (budget) {
//     remainingBudget = budget.spendingLimit - expense;
//     savingsProgress = balance - budget.savingsTarget;
//   }

//   return {
//     income,
//     expense,
//     balance,
//     budget,
//     remainingBudget,
//     savingsProgress
//   };
// };