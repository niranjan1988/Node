const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice, cb) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            // Check if this product already in cart
            const existingProduct = cart.products.find(p => p.id == id);
            let updatedProduct;
            if (existingProduct) {
                const index = cart.products.findIndex(p => p.id == id);
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity += 1;
                cart.products[index] = updatedProduct;
            } else {
                cart.products.push({ id, quantity: 1, price: productPrice });
            }
            cart.totalPrice += +productPrice;
            console.log(cart);
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log("written");
                cb();
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const index = cart.products.findIndex(p => p.id = id);

            const productQuantity = cart.products[index].quantity;
            const productPrice = cart.products[index].price;
            cart.products = cart.products.filter(product => product.id != id);
            cart.totalPrice = cart.totalPrice - (productQuantity * productPrice);

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log("written");

            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err) {
                cb(null);
            } else {
            cb(cart);
            }
        });
    }
} 