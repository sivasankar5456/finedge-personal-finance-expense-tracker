const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db_connection = require("./utils/db");
const userRoutes = require("./routes/userRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

db_connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger);

app.get("/health", (req, res) =>
  res.status(200).send("FinEdge API Running")
);

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

// GLOBAL ERROR HANDLER (MUST BE LAST)
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
