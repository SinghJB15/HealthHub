const bcrypt = require("bcrypt");
const express = require("express");
const users = express.Router();
const User = require("../models/users.js");

//User Registration Page
users.get("/new", (req, res) => {
    res.render("users/new.ejs", {
        currentUser: req.session.currentUser
    });
})

users.post("", (req, res) => {
    //Overwrite the user password with hashed password and send it to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log(`New user is created :`, createdUser);
            res.redirect("/health");
        }
    })
})

module.exports = users;