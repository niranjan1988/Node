const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Hello! You asked for home page or your request didnt match any explicitly mentioned URL's");
});

module.exports = router;
