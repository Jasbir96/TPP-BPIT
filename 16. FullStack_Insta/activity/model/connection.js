var mysql = require('mysql')
var connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    // db password
    password: 'password',
    // db instance name 
    database: 'insta_pp'
})
connection.connect();
module.exports = connection;