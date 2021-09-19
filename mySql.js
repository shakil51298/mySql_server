const mysql = require('mysql');
const express = require('express');
const app = express();

require('dotenv').config(); // configure environment veriable

// my authentocation 
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS
})

// connection way
// connection.connect((err) => {
//     const sqlInsert = "insert into students (first_name , last_name , year, phone_number) values ('Rakib', 'Khan' , '2015' , '185799855' )";

//     connection.query(sqlInsert, (err, res) => {
//         console.log('shakil');
//     })
//     if (err)
//         throw err;

//     console.log('connected!!');
// })


// insert statement

app.get('/student', (req, res) => {
    const sqlInsert = "inserta into students (first_name , last_name , year, phone_number) values ('?', '?' , '?' , '?' )";
    connection.query(sqlInsert, (err, res) => {
        console.log(res, err);
    })

})



// certing apis
app.get('/', async (req, res) => {
    res.send("hello Shakil !!")
})

//  selecting the PORT
app.listen(3000, () => {
    console.log("Running On Port : 3000");
})

module.exports = connection;

