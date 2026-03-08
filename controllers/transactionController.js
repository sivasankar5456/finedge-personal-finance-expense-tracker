const transactionService = require("../services/transactionService");

exports.createTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionService.createTransaction(
      req.user.userId,
      req.body
    );

    res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await transactionService.getAllTransactions(
      req.user.userId
    );

    res.json({
      success: true,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionService.getTransactionById(
      req.user.userId,
      req.params.id
    );

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionService.updateTransaction(
      req.user.userId,
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    await transactionService.deleteTransaction(
      req.user.userId,
      req.params.id
    );

    res.json({
      success: true,
      message: "Transaction deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

exports.getSummary = async (req, res, next) => {
  try {
    const summary = await transactionService.getSummary(req.user.userId);

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    next(error);
  }
};