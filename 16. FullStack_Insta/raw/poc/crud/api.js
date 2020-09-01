// npm init -y 
// npm i express
//  npm i nodemon --save-dev
// create start script int Package.json=>  "start":"nodemon crud/api.js"
// in pkg.json dir => npm start
const express = require("express");
const app = express();
let userDB = require("./user.json");
const fs = require("fs");
const path = require("path");
// REST API
// HTTP request => 
// create => POST
// http packet => body 
// user defined
app.use(function (req, res, next) {
    console.log("1st");
    console.log("Line no 17 " + req.body);
    // req.user = "sdafjgbjgbfjmh";
    console.log(req);
    console.log("`````````````````````````");
    next();
})
// pre-defined
app.use(express.json());
// handler req.body 
// user defined
app.use(function (req, res, next) {
    console.log("2nd");
    console.log("Line number 25");
    console.log(req.body);
    console.log("```````````````````````````````");
    // console.log(req);
    // console.log(req.user);
    next();
})

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
    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }

    res.status(200).json({
        status: "success",
        user: user
    })
})
// update => PATCH
// client will your id in url and data to update in req.body
// api/users/12345
app.patch("/api/users/:user_id", function (req, res) {
    let { user_id } = req.params;
    // {user_id:12345}
    let user;
    let toUpdate = req.body;
    for (let i = 0; i < userDB.length; i++) {
        if (userDB[i].user_id == user_id) {
            user = userDB[i];
        }
    }
    // update
    for (let key in toUpdate) {
        user[key] = toUpdate[key];
    }
    if (user == undefined) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));
    // update 
    res.status(200).json({
        status: "success",
        "message": "message"
    })
})
// search and delete 
app.delete("/api/users/:user_id", function (req, res) {
    let { user_id } = req.params;
    // {user_id:12345}
    let initialUserL = userDB.length;
    userDB = userDB.filter(function (user) {
        return user.user_id != user_id;
    })
    if (initialUserL == userDB.length) {
        return res.status(404).json({
            status: "failure",
            message: "user not found"
        })
    }
    fs.writeFileSync(path.join(__dirname, "user.json"), JSON.stringify(userDB));

    res.status(200).json({
        status: "success",
        "message": "user deleted"
    })
})
// delete=> DELETE 
// localhost:3000/api/users
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})