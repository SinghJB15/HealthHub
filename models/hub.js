const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true
    },
    imageURL: {
        type: String,
        required: false,
    },
    body: {
        type: String,
        required: true
    }
});

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;