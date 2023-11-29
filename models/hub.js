const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true
    },
    author: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, {
    timestamps: true
});

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;