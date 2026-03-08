const budgetService = require("../services/budgetService");

const setBudget = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const budget = await budgetService.setBudget(userId, req.body);

    res.status(200).json({
      success: true,
      data: budget
    });
  } catch (err) {
    next(err);
  }
};

const getBudget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    const budget = await budgetService.getBudget(userId, month, year);

    res.status(200).json({
      success: true,
      data: budget
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  setBudget,
  getBudget
};