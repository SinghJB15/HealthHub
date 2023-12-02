const express = require("express");
const router = express.Router();
const Article = require("../models/articles.js");
const User = require("../models/users.js");

//==========ROUTES(I.N.D.U.C.E.S)==========

const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser) {
        return next();
    }
}

//INDEX
router.get("", isAuthenticated, (req, res) => {
    const userId = req.session.currentUser._id;

    User.findById(userId, (err, user) => {
        if(err) {
            console.log(err.message);
        } else {
            //Access the user's articles array, which contains article IDs
            const articleIds = user.articles;

            Article.find({_id: {$in: articleIds}}, (err, articles) => {
                if(err) {
                    console.log(err.message);
                } else {
                    res.render("my_articles/my-articles.ejs", {
                        articles: articles,
                        currentUser: req.session.currentUser
                    })
                }
            })
        }
    })
})

module.exports = router;