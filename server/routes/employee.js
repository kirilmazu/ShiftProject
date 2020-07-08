var express = require('express')
var app = express()
var mysql = require('mysql')
var config = require('../config')

var dbConnection;
function handleDisconnect() {

    dbConnection = mysql.createConnection({
        host:	  config.database.host,
        user: 	  config.database.user,
        password: config.database.password,
        port: 	  config.database.port, 
        database: config.database.db
    });
    dbConnection.connect(function(error) {
        if(!!error) {
            console.log('Error connection to mySql');
            console.log(error);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('connect successfully to mySql');
        }
    });
    
    dbConnection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

app.get('/', function(req, res, next) {
    var sqlString = 'SELECT * FROM  tblemployee';

    dbConnection.query(sqlString, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {
          console.log("get conferences successfully");				
          res.send(JSON.stringify(result));
        }
    });    
});

//get employee by email and password
app.post('/login', function(req, res, next) {
    user = {
        'email': req.body.email,
        'password': req.body.password,
    };

    var sqlString = 'SELECT * FROM  tblemployee WHERE email = \'' + user.email + '\' AND password = \'' + user.password + '\';';

    dbConnection.query(sqlString, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {
          console.log("get employee for login successfully");				
          res.send(JSON.stringify(result));
        }
    });    
});

// Save employee
app.post('/addEmplyee', function(req, res, next) {
    employee = {
        'firstName': req.body.employee.firstName,
        'lastName': req.body.employee.lastName,
        'email': req.body.employee.email,
        'password': req.body.employee.password,
        'company': req.body.employee.company,
        'team': req.body.employee.team,
        'role': req.body.employee.role
    };

    dbConnection.query('INSERT INTO tblemployee SET ?', employee, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {				
            //res.send(JSON.stringify(result));
            console.log("success employee added successfully");
            res.send("success employee added successfully");

        }
    });
});

module.exports = app