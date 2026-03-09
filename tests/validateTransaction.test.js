const {
  validateCreateTransaction,
  validateUpdateTransaction
} = require("../middleware/transactionValidator");

const AppError = require("../utils/AppError");

describe("Transaction Validator Middleware", () => {

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /* =========================
     CREATE TRANSACTION TESTS
  ========================= */

  test("should allow valid transaction", () => {

    const req = {
      body: {
        type: "expense",
        category: "food",
        amount: 200
      }
    };

    validateCreateTransaction(req, {}, next);

    expect(next).toHaveBeenCalledWith(); // no error

  });

  test("should reject invalid transaction type", () => {

    const req = {
      body: {
        type: "invalid",
        category: "food",
        amount: 200
      }
    };

    validateCreateTransaction(req, {}, next);

    const error = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe("Transaction type must be income or expense");

  });

  test("should reject negative amount", () => {

    const req = {
      body: {
        type: "expense",
        category: "food",
        amount: -10
      }
    };

    validateCreateTransaction(req, {}, next);

    const error = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe("Amount must be a positive number");

  });

  test("should reject extra fields", () => {

    const req = {
      body: {
        type: "expense",
        category: "food",
        amount: 200,
        hackerField: "bad"
      }
    };

    validateCreateTransaction(req, {}, next);

    const error = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe("Invalid fields in request body");

  });

  /* =========================
     UPDATE TRANSACTION TESTS
  ========================= */

  test("should allow valid update", () => {

    const req = {
      body: {
        amount: 500
      }
    };

    validateUpdateTransaction(req, {}, next);

    expect(next).toHaveBeenCalledWith();

  });

  test("should reject invalid update type", () => {

    const req = {
      body: {
        type: "bad"
      }
    };

    validateUpdateTransaction(req, {}, next);

    const error = next.mock.calls[0][0];

    expect(error).toBeInstanceOf(AppError);
    expect(error.message).toBe("Transaction type must be income or expense");

  });

});