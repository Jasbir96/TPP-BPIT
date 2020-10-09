const express = require("express");
const app = express();
const passport = require("passport");
const util = require("util");
var mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');
const cookieSession = require("cookie-session");
// cookie define
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["hello"]
}))
app.use(passport.initialize());
app.use(passport.session());
// 
// ***************DataBase connection*******************************
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // db password
    password: 'password',
    // db instance name 
    database: 'insta_pp'
})
connection.connect();
let query = util.promisify(connection.query).bind(connection);
// ********************************************************************
console.log("connected to db");
app.use(express.static("public"));
var GoogleStrategy = require('passport-google-oauth2').Strategy;
// req will be send through browser
// start 
// setting define
// to  serialize user object
// user object store serialized form for furthur use
passport.serializeUser((user, done) => {
    // deserialize user;
    // deserialize 
    done(null, user.gmail_id);
})
// whenver some user send cookie 
passport.deserializeUser(async (gmail_id, done) => {
    // console.log(id);
    let resArr = await query(`SELECT * from user WHERE gmail_id="${gmail_id}"`);
    if (resArr.length == 0) {
        done(null, "user not found")
    } else {
        done(null, resArr[0])
    }
})
passport.use(new GoogleStrategy({
    clientID: "442880052776-f6vbup6kn2aa46b1ucr1s7feac3l6ioo.apps.googleusercontent.com",
    clientSecret: "PfloDXkHhqD4e2eNMQfeDAcu",
    callbackURL: "http://localhost:4000/auth/callback"
    // passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        console.log("Inside passport cb")
        console.log(profile);
        let resArr = await query(`SELECT * from user WHERE gmail_id="${profile.id}"`);
        let user = {};
        if (resArr.length == 0) {
            // signup
            user = {
                gmail_id: profile.id,
                p_img_url: profile.picture,
                email_id: profile.email,
                id: uuidv4()
            }
            await query(`INSERT INTO user SET?`, user);

        } else {
            // login
            user = resArr[0];
        }
        // google-> recieved our user , signup/login 
        // res send client=> browser
        done(null, user);
        // done(null, user);
    }
));
// req to google server => to get email  and profile
// passport .authectiecte => function google [email,profile],/setting
// redirect to googl server
app.get("/auth/google",
    passport.authenticate('google', { scope: ['email', 'profile'] }))
// req from google server
// authenticate=> 
app.get("/auth/callback", passport.authenticate("google"), function (req, res) {
    //identify 
    // req using passport.authenticate
    console.log("user authenticated");
    console.log(req.user);
    // res.send("user authenticated");
    // res.redirect("/user");
    res.redirect("http://localhost:3000");
})
const authCheck = (req, res, next) => {

    if (req.user) {
        next();
    } else {
        res.json({
            status: "failure"
        })
    }
}

app.get("/user", authCheck, function (req, res) {
    res.json({
        status: "success",
        user: req.user
    })
})
// const authCheck = (req, res, next) => {
//     if (req.user) {
//         next();
//     } else {
//         res.redirect("/auth/google")
//     }
// }


app.listen(4000,
    console.log("Server is listening at port 4000"));
