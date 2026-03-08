const Transaction = require("../models/transactionsModel");
const AppError = require("../utils/AppError");

const createTransaction = async (userId, data) => {
  const transaction = await Transaction.create({
    ...data,
    userId
  });

  return transaction;
};

const getAllTransactions = async (userId) => {
  return Transaction.find({ userId }).sort({ date: -1 });
};

const getTransactionById = async (userId, id) => {
  const transaction = await Transaction.findOne({ _id: id, userId });

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }

  return transaction;
};

const updateTransaction = async (userId, id, data) => {
  const transaction = await Transaction.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true, runValidators: true }
  );

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }

  return transaction;
};

const deleteTransaction = async (userId, id) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: id,
    userId
  });

  if (!transaction) {
    throw new AppError("Transaction not found", 404);
  }
};

const getSummary = async (userId) => {
  const transactions = await Transaction.find({ userId });

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    if (t.type === "expense") expense += t.amount;
  });

  return {
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense
  };
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getSummary
};