// npm init -y 
// npm i express
//  npm i nodemon --save-dev
// create start script int Package.json=>  "start":"nodemon crud/api.js"
// in pkg.json dir => npm start
const express = require("express");
const app = express();
// let userDB = require("./user.json");
const fs = require("fs");
const path = require("path");
const userRouter = require("./router/userRouter");
// const postRouter = require("./router/postRouter");
// REST API
// HTTP request => 
// create => POST
// http packet => body 
// user defined
// app.use(function (req, res, next) {
//     console.log("1st");
//     console.log("Line no 17 " + req.body);
//     // req.user = "sdafjgbjgbfjmh";
//     console.log(req);
//     console.log("`````````````````````````");
//     next();
// })
// pre-defined
app.use(express.json());
// handler req.body 
// user defined
// app.use(function (req, res, next) {
//     console.log("2nd");
//     console.log("Line number 25");
//     console.log(req.body);
//     console.log("```````````````````````````````");
//     // console.log(req);
//     // console.log(req.user);
//     next();
// })
// get Request => 
// localhost:3000/api/users/user_id
app.use("/api/users", userRouter);
// app.use("/api/post", postRouter);
// ****************************users********************
// user Route Handlers
// POST Route handlers
// app.get("/api/users/:user_id", getUser)
// // update => PATCH
// // client will your id in url and data to update in req.body
// // api/users/12345
// app.patch("/api/users/:user_id", updateUser)
// // search and delete 
// app.delete("/api/users/:user_id", deleteUser)
// ********************POST***********************

// localhost:3000/api/users
app.listen(3000, function () {
    console.log("Server is listening at port 3000");
})