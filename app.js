const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db_connection = require("./utils/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require('./routes/budgetRoutes')
const summaryRoutes = require('./routes/summaryRoutes')


const app = express();

db_connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger);

app.get("/health", (req, res) =>
  res.status(200).send("FinEdge API Running")
);

// users routes | auth routes
app.use("/api/v1/auth/users", userRoutes);
/*
http://localhost:3000/api/v1/auth/users
http://localhost:3000/api/v1/auth/users/login

heders: Content-Type: application/json

body:
{
  "name": "jon doe", // for login this one is not required
  "email": "jon.doe@example.com",
  "password": "StrongPass123@"
}
*/

// transactions routes
app.use("/api/v1/transactions", transactionRoutes );
/* 
http://localhost:3000/api/v1/transactions
http://localhost:3000/api/v1/transactions/id

headers:
Content-Type: application/json
jwt token foramt example
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWFhMmZhM2I3YTZhOGY5MTVhN2U3MWUiLCJjdXJyZW5jeSI6IklOUiIsImlhdCI6MTc3Mjg5MTU1OSwiZXhwIjoxNzcyOTAyMzU5fQ.BOAEN01BStgJd1MaNcNJ458DxCHVXCWqRfMDpvvNT-E 

body
{
  "type": "expense",
  "category": "cloths",
  "amount": 250,
  "note": "diwali shopping",
  "date": "2026-03-07T12:30:00.000Z"
}

*/

// budget routes 
app.use("/api/v1/budget", budgetRoutes);
/*
http://localhost:3000/api/v1/budget
http://localhost:3000/api/v1/budget?month=3&year=2026

headers:
Content-Type: application/json
jwt token foramt example
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWFhMmZhM2I3YTZhOGY5MTVhN2U3MWUiLCJjdXJyZW5jeSI6IklOUiIsImlhdCI6MTc3Mjg5MTU1OSwiZXhwIjoxNzcyOTAyMzU5fQ.BOAEN01BStgJd1MaNcNJ458DxCHVXCWqRfMDpvvNT-E 

body
{
  "month": 3,
  "year": 2026,
  "spendingLimit": 2000,
  "savingsTarget": 500
}

*/

// summary
app.use("/api/v1/summary", summaryRoutes);
/*
http://localhost:3000/api/v1/summary
http://localhost:3000/api/v1/summary?month=3
http://localhost:3000/api/v1/summary?month=3&year=2026

headers:
Content-Type: application/json
jwt token foramt example
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWFhMmZhM2I3YTZhOGY5MTVhN2U3MWUiLCJjdXJyZW5jeSI6IklOUiIsImlhdCI6MTc3Mjg5MTU1OSwiZXhwIjoxNzcyOTAyMzU5fQ.BOAEN01BStgJd1MaNcNJ458DxCHVXCWqRfMDpvvNT-E 

*/

// GLOBAL ERROR HANDLER (MUST BE LAST)
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
