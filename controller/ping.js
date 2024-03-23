const express = require("express");


//Ping to allow server to awake
exports.ping = (req, res) => {
    res.status(200).send("Server is awake");
}