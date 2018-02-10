const bl = require('../bl/productBL');
const model = require('../models/productModel');


function addProduct(req, callback) {
    console.log('>>> productController: ' + JSON.stringify(req.body));
    const product = new model.Product(req.body);
    
    if (productValid(product)) {
        bl.product.addProduct(product, function(err, result) {
            if (err) {
                callback(err);
            }
            callback(null, result);
        })
    }
}

function productValid(product) {

    return true;
}

module.exports.addProduct = addProduct;
