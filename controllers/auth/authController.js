const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/users/usersModel");

const JWT_SECRET = process.env.JWT_SECRET;

/* =========================
   REGISTER
========================= */
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.PASSWORD_SALTING_ROUNDS)
    );

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================
   LOGIN
========================= */
exports.loginUser = async (req, res) => {
  // console.log("logn user called")
  try {
    const { email, password } = req.body;

    // Need password explicitly because select:false
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "3h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Login failed"
    });
  }
};

