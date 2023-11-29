const express = require("express");
const router = express.Router();
const Topic = require("../models/hub.js");
const seedData = require("../models/seed.js");

//==========ROUTES(I.N.D.U.C.E.S)==========


//INDEX
router.get("", (req, res) => {
    Topic.find({}, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log(data);
        }
    })
})

//NEW
router.get("", (req, res) => {
    res.send("new route is working");
})

//DELETE


//UPDATE


//CREATE


//EDIT
router.get("/:id/edit", (req, res) => {
    Topic.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            res.send(data);
        }
    })
})

//SHOW
router.get("/:id", (req, res) => {
    Topic.findById(req.params.id, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            res.send(data);
        }
    })
})

//==========SEED DATA==========
// Topic.create(seedData, (err, data) => {
//     if(err) {
//         console.log(err.message);
//     } else {
//         console.log(`Data was added to db: `, data);
//     }
// })

module.exports = router;