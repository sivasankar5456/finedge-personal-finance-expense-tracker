// Node/finedge-personal-finance-expense-tracker/app.js
const  express = require('express');
const  cors = require('cors');
const  db_connection = require('./utils/db.js');
require('dotenv').config();
const authRoutes = require('./routes/auth/authRoutes.js')
const port = process.env.PORT;

const app = express()
db_connection()

app.use(express.urlencoded({ extended: true })); // Using HTML Forms (like <form method="POST">)
app.use(express.json()) // application/json 
app.use(cors())

app.get('/', (req, res) => res.status(200).send('Welcome To The finedge-personal-finance-expense-tracker Application'))
app.use('/api/v1/auth/users', authRoutes); 
/*
http://localhost:3000/api/v1/auth/users/register
http://localhost:3000/api/v1/auth/users/login

register sample payload
{
  "name": "john doe",
  "email": "john.doe@example.com",
  "password": "StrongPass123"
}
*/

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});