const express = require("express");
const router = express.Router();
const Article = require("../models/articles.js");
const User = require("../models/users.js");

//==========ROUTES(I.N.D.U.C.E.S)==========

const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser) {
        return next();
    };
}
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
                topic: topicName,
                currentUser: req.session.currentUser
            });
        }
    })

})

//NEW
router.get("/new/:topic", isAuthenticated, (req, res) => {
    //Need to decode the title parameter to orginal form to send the data to the new.ejs page
    const topicName = decodeURIComponent(req.params.topic)
    res.render("article_views/new.ejs", {
        topic: topicName,
        currentUser: req.session.currentUser
    })
})

//DELETE
router.delete("/:id", (req, res) => {
    const userId = req.session.currentUser._id;

    Article.findById(req.params.id, (err, article) => {
        if(err) {
            console.log(err.message);
        } else {
            if(article && article.author.toString() === userId.toString()) {
                //Article is found and user is author of article => proceed with deletion
                Article.findByIdAndRemove(req.params.id, (err, data) => {
                    if(err) {
                        console.log(err.message);
                    } else {
                        //Remove the article Id from the user's article array
                        User.findByIdAndUpdate(userId, {$pull: {articles: req.params.id}}, (err, user) => {
                            if(err) {
                                console.log(err.message);
                            } else {
                                res.redirect(`/article/${article.topic}`)
                            }
                        })
                    }
                })
            } else {
                //if user is not author of article
                res.redirect(`/article/show/${req.params.id}`)
            }
        }
    })
})

//UPDATE
router.put("/:id", isAuthenticated, (req, res) => {
    Article.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, data) => {
        if(err) {
            console.log(err.message);
        } else {
            res.redirect(`/article/${req.body.topic}`);
        }
    })
})


//CREATE
router.post("/:topic", isAuthenticated, (req, res) => {
    //Decode uri 
    const topic = decodeURIComponent(req.params.topic);

    //Get the userId
    const userId = req.session.currentUser._id;

    //Create the article and associate it with the userId
    const articleData = {
        title: req.body.title,
        content: req.body.content,
        author: userId,
        authorName: req.body.authorName,
        topic: req.body.topic
    };

    Article.create(articleData, (err, article) => {
        if(err) {
            console.log(err.message);
        } else {
            console.log(`Article was added to the articles db: `, article);

            //Push the articles Id to the users article array
            User.findByIdAndUpdate(userId, {$push: {articles: article._id}}, (err, user) => {
                if(err) {
                    console.log(err.message);
                } else {
                    console.log(`Article Id was added to the users db: `, article._id)
                }
            })
            res.redirect(`/article/${req.body.topic}`);
        }
    })

})

//EDIT
router.get("/edit/:id", isAuthenticated, (req, res) => {
    const userId = req.session.currentUser._id;

    Article.findById(req.params.id, (err, article) => {
        if(err) {
            console.log(err.message);
        } else {
            if(article.author.toString() === userId.toString()) {
                res.render("article_views/edit.ejs", {
                    article: article,
                    currentUser: req.session.currentUser
                });
            } else {
                res.redirect(`/article/show/${req.params.id}`)
            }
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
                article: data,
                currentUser: req.session.currentUser
            });
        }
    })
})

module.exports = router;