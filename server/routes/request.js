var express = require('express')
var app = express()
var mysql = require('mysql')
var config = require('../config')

var dbConnection;
function handleDisconnect() {
    //config connection
    dbConnection = mysql.createConnection({
        host:	  config.database.host,
        user: 	  config.database.user,
        password: config.database.password,
        port: 	  config.database.port, 
        database: config.database.db
    });
    //connect to DB
    dbConnection.connect(function(error) {
        if(!!error) {
            console.log('Error connection to mySql');
            console.log(error);
            setTimeout(handleDisconnect, 2000);
        } else {
            console.log('connect successfully to mySql');
        }
    });
    //if connection failed recinnect
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

//get all requests
app.get('/', function(req, res, next) {
    var sqlString = 'SELECT * FROM  tblrequests';

    dbConnection.query(sqlString, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {
          console.log("get request successfully");				
          res.send(JSON.stringify(result));
        }
    });    
});

//get request by employee id
app.post('/myRequests', function(req, res, next) {
    user = {
        'employeeID': req.body.employeeID,
    };

    var sqlString = 'SELECT * FROM  tblrequests WHERE ownerID = \'' + user.employeeID + '\';';

    dbConnection.query(sqlString, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {
          console.log("get request for employee successfully");				
          res.send(JSON.stringify(result));
        }
    });    
});

// Save requests
app.post('/addRequest', function(req, res, next) {
    request = {
        'ownerID': req.body.ownerID,
        'ownerName': req.body.ownerName,
        'date': req.body.date,
        'shift': req.body.shift,
        'priority': req.body.priority,
    };
    
    dbConnection.query('INSERT INTO tblrequests SET ?', request, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {
            console.log("success request added successfully");
            res.send("success request added successfully");
        }
    });
});

module.exports = app