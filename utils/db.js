// finedge-personal-finance-expense-tracker/utils/db.js
const mongoose = require("mongoose");

const db_connection = async () => {
  try {
    //  let result= await mongoose.connect(process.env.DB_URL);
    // console.log("MongoDB Connect Successfully!!!",result);
    await mongoose.connect(process.env.DB_URL);

    console.log("MongoDB Connect Successfully!!!");

  } catch (error) {
    console.log(error);
  }
};

module.exports = db_connection;