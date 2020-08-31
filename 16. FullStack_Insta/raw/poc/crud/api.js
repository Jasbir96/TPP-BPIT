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
// create => POST
// http packet => body 
app.use(express.json());
// handler req.body 
app.post("/api/users", function (req, res) {
    let user = req.body;
    // db Save
    // console.log(user);
    // if a new entry is created on server
    // memory -> ram
    userDB.push(user);
    fs.writeFileSync(path.join(__dirname, 
        "user.json"),
        JSON.stringify(userDB));
    //    res status code server send 
    res.status(201).json({
        success: "successfull",
        user: user
    })
})

// read  => GET ONE 
app.get("/api/users/:user_id", function (req, res) {
    let { user_id } = req.params;
    let user;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }
    res.status(200).json({
        status: "success",
        user: user != undefined ? user : "no user"
    })
})
// update => PATCH
// client will your id in url and data to update in req.body
// api/users/12345
app.patch("/api/users/:user_id", function (req, res) {
    let { user_id } = req.params;
    // {user_id:12345}
    let user;
    let toUpdate=req.body;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }
    // update 
    res.status(200).json({
        status: "success",
        user: user != undefined ? user : "no user"
    })
})
// search and delete 
app.delete("/api/users/:user_id", function (req, res) {

})
// delete=> DELETE 
// localhost:3000/api/users
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})