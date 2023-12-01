const express = require("express");
const router = express.Router();
const Article = require("../models/articles.js");

//==========ROUTES(I.N.D.U.C.E.S)==========

//INDEX


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
            res.redirect(`/article/${req.params.id}`);
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
router.get("/:id", (req, res) => {
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