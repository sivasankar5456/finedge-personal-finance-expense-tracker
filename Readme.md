# FinEdge Personal Finance Expense Tracker API

A **Node.js + Express REST API** for managing personal finances including **user authentication, transactions, budgets, and financial summaries**.
This project follows a **clean MVC architecture**, includes **JWT authentication**, **request validation**, **in-memory caching**, **rate limiting**, **CORS**, and **unit testing using Jest**.

---

# Features

* User Registration & Login (JWT Authentication)
* Create / Read / Update / Delete Transactions
* Monthly Budget Management
* Financial Summary & Analytics
* Category-wise Expense Breakdown
* Request Validation Middleware
* Global Error Handling
* Logging Middleware
* Rate Limiting
* CORS Enabled
* In-Memory Cache with TTL
* JSON Report Export using `fs/promises`
* Unit Testing using **Jest**

---

# Tech Stack

Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Jest (Unit Testing)

---

# Project Architecture (MVC)

```
finedge-personal-finance-expense-tracker
│
├── config
│   └── currencies.js
│
├── controllers
│   ├── userController.js
│   ├── transactionController.js
│   ├── budgetController.js
│   └── summaryController.js
│
├── middleware
│   ├── authenticate.js
│   ├── errorHandler.js
│   ├── logger.js
│   ├── rateLimeter.js
│   ├── transactionValidator.js
│   ├── validteBudget.js
│   └── validator.js

│
├── models
│   ├── UserModel.js
│   ├── TransactionModel.js
│   └── BudgetModel.js
│
├── routes
│   ├── budgetRoutes.js
│   ├── transactionRoutes.js
│   ├── userRoutes.js
│   └── summaryRoutes.js
│
├── services
│   ├── budgetService.js
│   ├── cacheService.js
│   ├── fileService.js
│   ├── summaryService.js
│   ├── transactionService.js
│   └── userService
│
├── utils
│   ├── db.js
│   └── AppError.js
│
├── data
│   └── summary-report.json
│
├── tests
│   ├── cacheService.test.js
│   ├── summaryService.test.js
│   ├── transactionController.test.js
│   └── transactionValidator.test.js
│
├── app.js
├── package.json
└── README.md
```

---

# Installation

Clone the repository

```
git clone https://github.com/sivasankar5456/finedge-personal-finance-expense-tracker.git
```

Navigate into project

```
cd finedge-personal-finance-expense-tracker
```

Install dependencies

```
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory.

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/finedge
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

---

# Running the Server

Development

```
npm run dev
```

Production

```
npm start
```

Server runs at

```
http://localhost:3000
```

---

# Health Check

Endpoint

```
GET /health
```

Response

```
FinEdge API Running
```

---

# Authentication APIs

Base URL

```
/api/v1/auth/users
```

## Register User

```
POST /api/v1/auth/users
```

Headers

```
Content-Type: application/json
```

Body

```
{
  "name": "jon doe",
  "email": "jon.doe@example.com",
  "password": "StrongPass123@"
}
```

Response

```
{
  "success": true,
  "data": {
    "_id": "user_id",
    "name": "jon doe",
    "email": "jon.doe@example.com"
  }
}
```

---

## Login User

```
POST /api/v1/auth/users/login
```

Body

```
{
  "email": "jon.doe@example.com",
  "password": "StrongPass123@"
}
```

Response

```
{
  "success": true,
  "token": "JWT_TOKEN"
}
```

---

# Transaction APIs

Base URL

```
/api/v1/transactions
```

Headers

```
Content-Type: application/json
Authorization: Bearer JWT_TOKEN
```

---

## Create Transaction

```
POST /api/v1/transactions
```

Body

```
{
  "type": "expense",
  "category": "cloths",
  "amount": 250,
  "note": "diwali shopping",
  "date": "2026-03-07T12:30:00.000Z"
}
```

Response

```
{
  "success": true,
  "data": {
    "_id": "transaction_id",
    "type": "expense",
    "category": "cloths",
    "amount": 250,
    "note": "diwali shopping",
    "date": "2026-03-07T12:30:00.000Z"
  }
}
```

---

## Get All Transactions

```
GET /api/v1/transactions
```

Response

```
{
  "success": true,
  "data": [...]
}
```

---

## Get Transaction by ID

```
GET /api/v1/transactions/:id
```

Response

```
{
  "success": true,
  "data": {...}
}
```

---

## Update Transaction

```
PATCH /api/v1/transactions/:id
```

Body

```
{
  "amount": 500
}
```

Response

```
{
  "success": true,
  "data": {...}
}
```

---

## Delete Transaction

```
DELETE /api/v1/transactions/:id
```

Response

```
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

---

# Budget APIs

Base URL

```
/api/v1/budget
```

Headers

```
Authorization: Bearer JWT_TOKEN
```

---

## Set Budget

```
POST /api/v1/budget
```

Body

```
{
  "month": 3,
  "year": 2026,
  "spendingLimit": 2000,
  "savingsTarget": 500
}
```

Response

```
{
  "success": true,
  "data": {
    "month": 3,
    "year": 2026,
    "spendingLimit": 2000,
    "savingsTarget": 500
  }
}
```

---

## Get Budget

```
GET /api/v1/budget?month=3&year=2026
```

Response

```
{
  "success": true,
  "data": {...}
}
```

---

# Summary API

Base URL

```
/api/v1/summary
```

Headers

```
Authorization: Bearer JWT_TOKEN
```

Examples

```
GET /api/v1/summary
GET /api/v1/summary?month=3
GET /api/v1/summary?month=3&year=2026
```

Response

```
{
  "success": true,
  "cached": false,
  "data": {
    "income": 5000,
    "expense": 2000,
    "balance": 3000,
    "remainingBudget": 1000,
    "savingsProgress": 500,
    "categoryBreakdown": {
      "food": 500,
      "shopping": 300
    }
  }
}
```

Summary responses are **cached in memory (TTL 60 seconds)** to avoid repeated calculations.

---

# Middleware

* Request Logger
* JWT Authentication
* Transaction Validation
* Global Error Handler
* Rate Limiter
* CORS

---

# Caching

An **in-memory cache service** is implemented using `Map`.

```
cache.set(key, value, ttl)
cache.get(key)
```

Used in `/summary` to improve performance.

---

# File Export

Financial summaries are exported to a JSON file using `fs/promises`.

```
/data/summary-report.json
```

---

# Rate Limiting

To prevent abuse, requests are limited using:

```
express-rate-limit
```

---

# Unit Testing

Testing framework:

```
Jest
```

Run tests

```
npm test
```

Test coverage includes:

* Cache Service
* Summary Service
* Transaction Controller
* Transaction Validator Middleware

---

# Security

* JWT Authentication
* Request Validation
* Protected Routes
* Rate Limiting
* CORS Protection

---

# Performance Optimizations

* MongoDB Indexes
* In-Memory Caching
* Modular Service Layer
* Async/Await for Non-Blocking I/O

---

# Future Improvements

* Redis Cache
* Graph Analytics for Spending
* Automated Budget Suggestions
* Web Dashboard UI
* Docker Deployment

---

# Author

Siva Sankar

---

# License

MIT License
