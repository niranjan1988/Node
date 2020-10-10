const express = require('express');

const app = express();

const port = 3000;

app.use('/add', (req, res, next) => {
    console.log(req.url);
    res.send(`<form action='/addbook' method='post'> 
                <input type='text' name='name' id='name'>
                <button type='submit'>Add</button>
            </form>`);
});

app.use('/addbook',(req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});

app.use('/',(req, res, next) => {
    res.send("Hello!");
});

app.listen(port, () => {
    console.log("Listening to port: " + port);
});