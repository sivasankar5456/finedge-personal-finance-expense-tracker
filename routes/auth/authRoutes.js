const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../../controllers/auth/authController");

const validateRegister = require("../../middlewares/auth/validateRegister")
const validateLogin = require("../../middlewares/auth/validateLogin")


router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;