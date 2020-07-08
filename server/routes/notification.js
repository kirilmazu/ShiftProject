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

// get all notification items
app.get('/', function(req, res, next) {
    var sqlString = 'SELECT * FROM  tblnotificationitem';

    dbConnection.query(sqlString, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {
          console.log("get notificationitems successfully");				
          res.send(JSON.stringify(result));
        }
    });    
});

// Save notification item
app.post('/addNotificationItem', function(req, res, next) {
    notificationitem = {
        'ownerID': req.body.ownerID,
        'IconPath': req.body.IconPath,
        'header': req.body.header,
        'body': req.body.body,
    };

    dbConnection.query('INSERT INTO tblnotificationitem SET ?', notificationitem, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send(JSON.stringify(err));
            console.log(err);
        } else {		
            console.log("success notificationitem added successfully");
            res.send("success notificationitem added successfully");
        }
    });
});

module.exports = app