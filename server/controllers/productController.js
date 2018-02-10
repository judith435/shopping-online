const bl = require('../bl/productBL');
const model = require('../models/productModel');


function addProduct(req, callback) {
    console.log('>>> productController: ' + JSON.stringify(req.body));
    const product = new model.Product(req.body);
    const inputErrorsFound = '';
    if (productValid(product, inputErrorsFound)) {
        bl.product.addProduct(product, function(err, newProductID) {
            if (err) {
                callback(err);
            }
            callback(null, newProductID);
        })
    }
    else {
        callback('following erors were found in input ' + inputErrorsFound);
    }
}

function productValid(product, inputErrorsFound) {

    return false;
}

module.exports.addProduct = addProduct;
