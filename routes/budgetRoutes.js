const express = require("express");
const router = express.Router();

const budgetController = require("../controllers/budgetController");
const validateBudget = require("../middleware/validateBudget");
const authenticateUser = require("../middleware/authenticate");

router.use(authenticateUser);


router.post("/", validateBudget, budgetController.setBudget);

router.get("/", budgetController.getBudget);

module.exports = router;