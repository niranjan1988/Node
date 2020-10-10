const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/add', (req, res, next) => {
    res.send(`<form action='/addbook' method='post'> 
                <input type='text' name='name' id='name'>
                <button type='submit'>Add</button>
            </form>`);
});

app.post('/addbook', (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});

app.use('/', (req, res, next) => {
    res.send("Hello! You asked for home page or your request didnt match any explicitly mentioned URL's");
});

app.listen(port, () => {
    console.log("Listening to port: " + port);
});