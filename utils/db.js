// finedge-personal-finance-expense-tracker/utils/db.js

const mongoose = require("mongoose");

const db_connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = db_connection;
