const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require("./routes/shop");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    res.send("Hello! You asked for home page or your request didnt match any explicitly mentioned URL's");
});

app.listen(port, () => {
    console.log("Listening to port: " + port);
});