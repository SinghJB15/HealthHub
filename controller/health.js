const express = require("express");
const router = express.Router();
const Topic = require("../models/topics.js");
const Article = require("../models/articles.js");
const seedData = require("../models/seed.js");
const articleSeedData = require("../models/seedArticles.js");

//==========ROUTES(I.N.D.U.C.E.S)==========


//INDEX
router.get("", (req, res) => {
    Topic.find({}, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log("route is being hit");
            res.render("index.ejs", {
                topics: data,
                currentUser: req.session.currentUser
            })
        }
    })
})

//==========SEED DATA==========

//Topics Seed
// Topic.create(seedData, (err, data) => {
//     if(err) {
//         console.log(err.message);
//     } else {
//         console.log(`Topic data was added to db: `, data);
//     }
// })

// //Articles Seed
// Article.create(articleSeedData, (err, data) => {
//     if(err) {
//         console.log(err.message);
//     } else {
//         console.log(`Article data was added to articles db: `, data);
//     }
// })

module.exports = router;