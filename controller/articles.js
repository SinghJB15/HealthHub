// const express = require("express");
// const router = express.Router();
// const Article = require("../models/articles.js");

//==========ROUTES(I.N.D.U.C.E.S)==========

//INDEX


//NEW
// router.get("/new", (req, res) => {
//     res.render("../views/article_views/new.ejs");
// })

//DELETE


//UPDATE


//EDIT


//SHOW
// router.get("/:title", (req, res) => {
//     //Need to decode the title parameter to original form in order to query the database
//     const titleName = decodeURIComponent(req.params.title);
//     Article.find({title: titleName}, (err, data) => {
//         if(err) {
//             console.log(err.message);
//         } else {
//             res.render("article_views/index.ejs");
//         }
//     })
// })