const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json())


// my authentocation 
const myStudentDb = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: '512988',
    database: 'grade_system'
})

// insert statement

app.post('/student/api/insert_student_info/', (req, res) => {
    const FName = req.body.fName;
    const lName = req.body.lName;
    const year = req.body.year;
    const phn = req.body.phn;

    const sqlInsert = "insert into students (first_name , last_name , year, phone_number) values (?, ?, ? , ? )";
    myStudentDb.query(sqlInsert, [FName, lName, year, phn], (err, result) => {
        res.send(result)
        console.log(res, err);
    })

})

//  getting data from database
app.get('/student/info/Get/', (req, res) => {
    const sqlInsert = "SELECT * FROM grade_system.students";
    myStudentDb.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

// certing apis
app.get('/', async (req, res) => {
    res.send("hello Shakil !!")
})

//  selecting the PORT
app.listen(5000, () => {
    console.log("Running On Port : 5000");
})

// module.exports = myStudentDb;

