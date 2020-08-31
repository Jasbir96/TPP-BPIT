// npm init -y 
// npm i express
//  npm i nodemon --save-dev
// create start script int Package.json=>  "start":"nodemon crud/api.js"
// in pkg.json dir => npm start
const express = require("express");
const app = express();
// REST API
// HTTP request => 
// create => POST
// read  => GET
app.get("/api/users", function (req, res) {
    console.log("Recieved req");
    res.status(200).json({
        status: "success recieved get request from client",
    })
    
})
// update => PATCH
// delete=> DELETE 
// localhost:3000/api/users
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})