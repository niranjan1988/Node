const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./models/product');
const Cart = require('./models/cart');
const User = require('./models/user');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { where } = require('sequelize');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findAll({ where: { id: 1 } }).then(user => {
        req.user = user;
        next();
    }).catch(err => console.log);
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize.sync()    //{force: true}
    .then(result => {
        return User.findAll({ where: { id: 1 } });
    })
    .then(user => {
        if (!user.length) {
            User.create({ name: 'Max', email: 'test@gmail.com' });
        }
        return user;
    })
    .then(() => {
        app.listen(3000);
        console.log('Listening to port 3000');
    })
    .catch(err => {
        console.log(err);
    });


