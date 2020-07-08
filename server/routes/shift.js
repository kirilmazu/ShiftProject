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

//get all shifts
app.get('/', function(req, res, next) {
    var sqlString = 'SELECT * FROM  tblshift';

    dbConnection.query(sqlString, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {
          console.log("get shifts successfully");				
          res.send(JSON.stringify(result));
        }
    });    
});

// Save shift
app.post('/addShift', function(req, res, next) {
    shift = {
        'ownerID': req.body.ownerID,
        'ownerName': req.body.ownerName,
        'date': req.body.date,
        'shift': req.body.shift,
    };
    
    dbConnection.query('INSERT INTO tblshift SET ?', shift, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {
            console.log("success shift added successfully");
            res.send("success shift added successfully");
        }
    });
});

module.exports = app