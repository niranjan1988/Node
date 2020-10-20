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
                const index = cart.products.findIndex(p => p.id = id);
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity += 1;
                cart.products[index] = updatedProduct;
            } else {
                cart.products.push({ id, quantity: 1 });
            }
            cart.totalPrice += +productPrice;
            console.log(cart);
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log("written");
                cb();
            });
        });
    }
} 