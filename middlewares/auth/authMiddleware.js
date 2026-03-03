const jwt = require("jsonwebtoken");
const User = require("../../models/users/usersModel");

const authenticateUser = async (req, res, next) => {
  // console.log('authenticate called')
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    req.user = user; // attach user to request
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }
};

module.exports = authenticateUser;

