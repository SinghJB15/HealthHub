const express = require("express");
const router = express.Router();
const Topic = require("../models/hub.js");
const seedData = require("../models/seed.js");

//==========ROUTES(I.N.D.U.C.E.S)==========


//INDEX


//NEW


//DELETE


//UPDATE


//EDIT


//SHOW


//==========SEED DATA==========
Topic.create(seedData, (err, data) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log(`Data was added to db: `, data);
    }
})

module.exports = router;