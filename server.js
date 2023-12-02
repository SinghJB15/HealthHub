//==========DEPENDENCIES==========
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");

//==========CONTROLLERS==========
const healthController = require("./controller/health.js");
const articleController = require("./controller/articles.js");
const userController = require("./controller/users.js");
const sessionsController = require("./controller/sessions.js");
// const sessionsController = require("./controller/sessions.js");

//==========ENV==========
const MONGOURI = process.env.MONGOURI;
const PORT = process.env.PORT || 3000;

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
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use("/health", healthController);
app.use("/users", userController);
app.use("/article", articleController);
app.use("/sessions", sessionsController);


//==========LISTENER==========
app.listen(PORT, () => {
    console.log(`App listening on PORT: `, PORT);
})
