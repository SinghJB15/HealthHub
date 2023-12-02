const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const User = require("../models/users.js");

sessions.get("/new", (req, res) => {
    res.render("sessions/new.ejs", {
        currentUser: req.session.currentUser
    });
});


sessions.post("", (req, res) => {
    //look for username
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if(err) {
            console.log(err.message);
            res.send("db error");
        } else if(!foundUser) {
            res.send("Sorry no user found");
        } else {
            //user is found

            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                res.redirect("/health");
            } else {
                //Passwords do not match
                res.send("Username or password does not match");
            }
        }
    })
});

sessions.delete("", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/health");
    })
});

module.exports = sessions;