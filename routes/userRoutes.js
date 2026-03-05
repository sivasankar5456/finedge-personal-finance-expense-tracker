const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { validateRegister, validateLogin } = require("../middleware/validator");

router.post("/", validateRegister, userController.registerUser);
router.post("/login", validateLogin, userController.loginUser);

module.exports = router;
