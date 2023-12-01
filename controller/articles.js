const express = require("express");
const router = express.Router();
const Article = require("../models/articles.js");

//==========ROUTES(I.N.D.U.C.E.S)==========

//INDEX
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

//NEW
router.get("/new/:topic", (req, res) => {
    //Need to decode the title parameter to orginal form to send the data to the new.ejs page
    const topicName = decodeURIComponent(req.params.topic)
    res.render("article_views/new.ejs", {
        topic: topicName
    })
})

//DELETE


//UPDATE
router.put("/:id", (req, res) => {
    Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            res.redirect(`/article/${req.body.topic}`);
        }
    })
})


//CREATE
router.post("/:topic", (req, res) => {
    //Decode uri 
    const topic = decodeURIComponent(req.params.topic);
    Article.create(req.body, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log(`Data was added to the articles db: `, data);
            res.redirect(`/article/${topic}`);
        }
    })
})

//EDIT
router.get("/edit/:id", (req, res) => {
    Article.findById(req.params.id, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            res.render("article_views/edit.ejs", {
                article: data
            })
        }
    })
})

//SHOW
router.get("/show/:id", (req, res) => {
    Article.findById(req.params.id, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log(data);
            res.render("article_views/show.ejs", {
                article: data
            });
        }
    })
})

module.exports = router;