const mongodb = require('mongodb');
const Product = require('./product');
const getDb = require('../util/database').getDb;

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) });
    }

    addToCart(product) {
        const updatedCartItems = [...this.cart.items];
        const prodIndex = updatedCartItems.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });

        if (prodIndex >= 0) {
            updatedCartItems[prodIndex].quantity = updatedCartItems[prodIndex].quantity + 1;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: 1
            });
        }

        const updatedCart = {
            items: updatedCartItems
        };

        const db = getDb();
        return db
            .collection('users')
            .updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            );
    }

    getCart() {
        const db = getDb();
        const prodIds = this.cart.items.map(i => {
            return i.productId;
        });

        return db.collection('products')
            .find({ _id: { $in: prodIds } })
            .toArray()
            .then(products => {
                return products.map(p => {
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString();
                        }).quantity
                    };
                });
            });
    }

    deleteItemFromCart(prodId) {
        const updatedCartItems = this.cart.items.filter(prod => {
            return prod.productId.toString() !== prodId.toString();
        })
        const updatedCart = {
            items: updatedCartItems
        };
        const db = getDb();
        return db.collection('users')
            .updateOne(
                { _id: mongodb.ObjectId(this._id) },
                { $set: { cart: updatedCart } }
            );
    }

    addOrder() {
        const db = getDb();
        return this.getCart().then(products=>{
            const order = {
                items:products,
                user:{
                    _id:new mongodb.ObjectId(this._id),
                    name:this.username
                }}
                return db.collection('orders').insertOne(order)
                .then(result => {
                    this.cart = { items: [] };
                    return db.collection('users')
                        .updateOne(
                            { _id: mongodb.ObjectId(this._id) },
                            { $set: { cart: this.cart } }
                        )
                })
        })        
    }

    getOrders() {
        const db = getDb();
        return db.collection('orders')
        .find({'user._id':new mongodb.ObjectId(this._id)})
        .toArray();
    }
}

module.exports = User;