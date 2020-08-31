// npm init -y 
// npm i express
//  npm i nodemon --save-dev
// create start script int Package.json=>  "start":"nodemon crud/api.js"
// in pkg.json dir => npm start
const express = require("express");
const app = express();
const userDB = require("./user.json");
const fs = require("fs");
const path = require("path");
// REST API
// HTTP request => 
// read  => GET
// create => POST
app.use(express.json());
app.post("/api/users", function (req, res) {
    let user = req.body;
    // db Save
    // console.log(user);
    // if a new entry is created on server
    // memory -> ram
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
//    res status code server send 
    res.status(201).json({
        success: "successfull",
        user: user
    })
})

// update => PATCH
// delete=> DELETE 
// localhost:3000/api/users
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})