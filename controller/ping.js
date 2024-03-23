const express = require("express");
const router = express.Router();


//Ping to allow server to awake
router.get("/ping", (req, res) => {
    res.status(200).send("ok");
})

module.exports = router;