const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");

const register = async (name, email, password, currency) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(process.env.PASSWORD_SALTING_ROUNDS)
  );

  await User.create({
    name,
    email,
    password: hashedPassword,
    currency // currency null or undefined default INR currency will be added
  });
};

const login = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      userId: user._id,
      currency: user.currency
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3h"
    }
  );

  return token;
};

module.exports = { register, login };