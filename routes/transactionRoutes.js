const express = require("express");
const router = express.Router();

const controller = require("../controllers/transactionController");
const validator = require("../middleware/transactionValidator");
const authenticateUser = require("../middleware/authenticate");

router.use(authenticateUser);

router.post(
  "/",
  validator.validateCreateTransaction,
  controller.createTransaction
);

router.get("/", controller.getTransactions);

router.get("/:id", controller.getTransaction);

router.patch(
  "/:id",
  validator.validateUpdateTransaction,
  controller.updateTransaction
);

router.delete("/:id", controller.deleteTransaction);

router.get("/summary", controller.getSummary);

module.exports = router;