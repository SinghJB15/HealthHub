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
            res.render("index.ejs", {
                topics: data
            })
        }
    })
})

//NEW
// router.get("", (req, res) => {
//     res.send("new route is working");
// })

//DELETE


//UPDATE


//CREATE
router.post("/:topic", (req, res) => {
    //Decode uri 
    const topic = decodeURIComponent(req.params.topic);
    Article.create(req.body, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log(`Data was added to the articles db: `, data);
            res.redirect(`/health/${topic}`);
        }
    })
})

//SHOW
router.get("/:topic", (req, res) => {
    //Need to decode the topic parameter to original form in order to query the database
    const topicName = decodeURIComponent(req.params.topic);
    Article.find({topic: topicName}, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log("found the relevant articles");
            res.render("article_views/index.ejs", {
                articles: data,
                topic: topicName
            });
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