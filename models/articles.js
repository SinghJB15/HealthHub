const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, //Reference to the user schema
        ref: 'User' //name of the user model
    },
    authorName: {
        type: String
    },
    topic: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    contentImage: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;