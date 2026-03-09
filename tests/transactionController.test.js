jest.mock("../services/transactionService.js");

const transactionService = require("../services/transactionService");
const controller = require("../controllers/transactionController");

describe("Transaction Controller", () => {

  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const next = jest.fn();

  const userId = "507f1f77bcf86cd799439011";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should create transaction", async () => {

    const req = {
      user: { userId },
      body: {
        type: "expense",
        category: "food",
        amount: 100
      }
    };

    const res = mockResponse();

    const mockTransaction = { id: "1", ...req.body };

    transactionService.createTransaction.mockResolvedValue(mockTransaction);

    await controller.createTransaction(req, res, next);

    expect(transactionService.createTransaction).toHaveBeenCalledWith(
      userId,
      req.body
    );

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockTransaction
    });

  });

  test("should fetch all transactions", async () => {

    const req = { user: { userId } };

    const res = mockResponse();

    const mockTransactions = [{ amount: 100 }, { amount: 200 }];

    transactionService.getAllTransactions.mockResolvedValue(mockTransactions);

    await controller.getTransactions(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockTransactions
    });

  });

  test("should fetch single transaction", async () => {

    const req = {
      user: { userId },
      params: { id: "123" }
    };

    const res = mockResponse();

    const mockTransaction = { amount: 500 };

    transactionService.getTransactionById.mockResolvedValue(mockTransaction);

    await controller.getTransaction(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockTransaction
    });

  });

  test("should update transaction", async () => {

    const req = {
      user: { userId },
      params: { id: "123" },
      body: { amount: 900 }
    };

    const res = mockResponse();

    const updated = { id: "123", amount: 900 };

    transactionService.updateTransaction.mockResolvedValue(updated);

    await controller.updateTransaction(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: updated
    });

  });

  test("should delete transaction", async () => {

    const req = {
      user: { userId },
      params: { id: "123" }
    };

    const res = mockResponse();

    transactionService.deleteTransaction.mockResolvedValue();

    await controller.deleteTransaction(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Transaction deleted successfully"
    });

  });

});