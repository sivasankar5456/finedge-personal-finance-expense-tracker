jest.mock("../models/transactionsModel.js");
jest.mock("../models/BudgetModel.js");

const Transaction = require("../models/transactionsModel");
const Budget = require("../models/BudgetModel");

const summaryService = require("../services/summaryService");

describe("Summary Service", () => {

  test("should calculate income expense and balance", async () => {

    Transaction.find.mockResolvedValue([
      { type: "income", amount: 1000 },
      { type: "expense", amount: 400 },
      { type: "expense", amount: 100 }
    ]);

    Budget.findOne.mockResolvedValue(null);

    const result = await summaryService.calculateSummary(
      "user1",
      3,
      2026
    );

    expect(result.income).toBe(1000);
    expect(result.expense).toBe(500);
    expect(result.balance).toBe(500);

  });

});