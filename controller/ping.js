const express = require("express");
const router = express.Router();


//Ping to allow server to awake
router.get("", (req, res) => {
    res.status(200).send("ok");
})

module.exports = router;