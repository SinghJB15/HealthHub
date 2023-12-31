const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String
    }   
})

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;