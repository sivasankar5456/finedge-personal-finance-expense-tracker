const express = require("express");
const router = express.Router();

const summaryController = require("../controllers/summaryController");
const authenticateUser = require("../middleware/authenticate");

router.get("/", authenticateUser, summaryController.getSummary);

module.exports = router;
