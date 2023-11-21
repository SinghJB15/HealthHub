//==========DEPENDENCIES==========
const express = require("express");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const db = mongoose.connection;
const methodOverride = require("method-override");

//==========CONFIG==========
const mongoURI = "mongodb://localhost:27017/healthhub"

//==========DB CONNECTION==========
mongoose.connect(mongoURI, () => {
    console.log("The connection with mongoDB is established")
})

//==========MODELS==========
const Topic = require("./models/hub.js");
const seedData = require("./models/seed.js");

//==========MIDDLEWARE==========
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

//==========ROUTES(I.N.D.U.C.E.S)==========

//INDEX
app.get("/hub", (req, res) => {
    res.send("Index route is working");
})

//NEW
app.get("/hub/new", (req, res) => {
    res.send("New route is working");
})

//DELETE


//UPDATE


//CREATE


//EDIT
app.get("/hub/:id/edit", (req, res) => {
    res.send("Edit route is working");
})

//SHOW
app.get("/hub/:id", (req, res) => {
    res.send("Show route is working");
})

//==========LISTENER==========
app.listen(PORT, () => {
    console.log(`App listening on PORT: `, PORT);
})

//==========SEED========== 
Topic.create(seedData, (err, data) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log("Seed-data was added successfully to the db");
    }
})