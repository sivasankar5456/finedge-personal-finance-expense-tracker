// z-Aritribe-Assinments-Node/finedge-personal-finance-expense-tracker/app.js
const  express = require('express');
const  cors = require('cors');
const  db_connection = require('./utils/db.js');
const  dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

const app = express()
db_connection()

app.use(express.urlencoded({ extended: true })); // Using HTML Forms (like <form method="POST">)
app.use(express.json()) // application/json 
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});