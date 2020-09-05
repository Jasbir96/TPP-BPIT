var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'insta_pp'
})

connection.connect();
console.log("connected to db");

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
// flush privileges;