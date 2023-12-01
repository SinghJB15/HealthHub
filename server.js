//==========DEPENDENCIES==========
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const healthController = require("./controller/health.js");
const articleController = require("./controller/articles.js");
const MONGOURI = process.env.MONGOURI;

//==========DB CONNECTION==========
mongoose.connect(MONGOURI + "health-hub");
mongoose.connection.once("open", () => {
    console.log("connected to mongo");
})

//==========MIDDLEWARE==========
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use("/health", healthController);
app.use("/article", articleController);

//==========LISTENER==========
app.listen(PORT, () => {
    console.log(`App listening on PORT: `, PORT);
})
