const express = require("express");
const app = express();
const passport = require("passport");
app.use(express.static("public"));

var GoogleStrategy = require('passport-google-oauth2').Strategy;
// req will be send through browser
// start 
passport.initialize();
// setting define
passport.use(new GoogleStrategy({
    callbackURL: "http://localhost:4000/auth/callback"
    // passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        console.log("Inside passport cb")
        console.log(profile);
        // signup
        // login
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
    res.send("user authenticated");
})
app.listen(4000,
    console.log("Server is listening at port 4000"));
