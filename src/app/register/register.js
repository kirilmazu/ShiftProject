const express = require('express');
const mysql = require('mysql');
const app = express();


//db store on www.freesqldatabase.com
// Create connection
const db = mysql.createConnection({
    host     : 'sql7.freesqldatabase.com',
    user     : 'sql7345042',
    password : 'XHdPZER6tt',
    database : 'sql7345042'
});

// Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

// Insert omer
app.get('/user', (req, res) => {
    let employee = {email:, password:,
                firstName:, lastname:, company:,
                team:, role:};
    let sql = 'INSERT INTO employees SET ?';
    let query = db.query(sql, employee, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Omer added...');
    });
});
