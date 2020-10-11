const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const adminRoutes = require('./routes/admin');
const shopRoutes = require("./routes/shop");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','not-found.html'))
})

app.listen(port, () => {
    console.log("Listening to port: " + port);
});