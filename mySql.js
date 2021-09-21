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
    })

})

//  getting data from database
app.get('/student/info/Get/', (req, res) => {
    const sqlInsert = "SELECT * FROM grade_system.students";
    myStudentDb.query(sqlInsert, (err, result) => {
        res.send(result)
    })
})

//  Delete

app.delete('/delete/studentinfo/:id', (req, res) => {
    const Studentid = req.params.id;
    console.log(Studentid);
    const sqlStatement = "delete from students where id = ?";
    myStudentDb.query(sqlStatement, Studentid, (err, result) => {
        res.send(result)
    })
})

// update data basis on id
app.put('/update/studentinfo/', (req, res) => {
    const updateRequestId = req.body.id;
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const year = req.body.year;
    const phone_number = req.body.phoneNumber;

    const sqlUpdateStudentInfo = "UPDATE students SET first_name =?, last_name = ?, year = ?, phone_number = ? WHERE id = ?";
    myStudentDb.query(sqlUpdateStudentInfo, [first_name, last_name, year, phone_number, updateRequestId], (err, result) => {
        console.log(result);
    })
    console.log(updateRequestId, first_name, last_name, year, phone_number);

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

