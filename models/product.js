const products=[];

module.exports = class Product {    
    constructor(title) {
        this.title = title;
    }

    save(){
        products.push(this);
        console.log(this.products);
    }
    static fetchAll(){
        return products;
    }
}