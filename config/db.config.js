const mysql = require('mysql2');

//create mysql connection

const dbConn = mysql.createConnection({
    host: '3.8.19.24',
    user: 'monty',
    password: 'secret',
    database: 'scoutsbag'
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log("Database connected success.");
});

module.exports = dbConn;