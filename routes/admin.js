const express = require("express");

const router= express.Router();

router.get('/add', (req, res, next) => {
    res.send(`<form action='/addproduct' method='post'> 
                <input type='text' name='name' id='name'>
                <button type='submit'>Add</button>
            </form>`);
});

router.post('/addproduct', (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});

module.exports = router;