const bl = require('../bl/productBL');
const model = require('../models/productModel');
const validations = require('../share/validations');
const logError = require('../share/errorLogging.js'); //must log product image upload errors

function getProducts(callback) {

    bl.product.getProducts(function(err, productArray) {
        if (err) {
            callback('called by productController.getProducts => ' + err);
        }
        callback(null, productArray);
    })
}


function addUpdateProduct(activity, req, callback) {
    console.log('>>> productController: ' + JSON.stringify(req.body) + '  activity=' + activity);
    const product = new model.Product(req.body);
    const inputErrorsFound = productValid(activity, product, req);
    if (!inputErrorsFound) {
        bl.product.addUpdateProduct(activity, product, function(err, response) {
            if (err) {
                callback('called by productController.addUpdateProduct => ' + err, null, null);
            }
            else {
                if (activity === 'updateProduct' && !req.files) {
                    callback(null, product.id, null);
                }
                else {
                    let productID = activity === 'addProduct' ? response : product.id;
                    saveProductImage(req, productID, function (err) {
                        if (err) {
                            callback(null, productID + err, null); //save product succeeded however saving image failed - send relevant message to user 
                        }
                        callback(null, productID, null);
                    }); 
                }
            }
        })
    }
    else {
        callback(null, null, inputErrorsFound); 
    }
}

function productValid(activity, product, req) {
    let errorsFound = '';

    errorsFound  = validations.inputEmpty(product.name) ?  'product name required \n' : '';
    errorsFound += !validations.inputValidAmount(product.price) ? 'product price up to 9999.99 $ required \n' : '';
    errorsFound += validations.inputEmpty(product.category) ? 'product category required \n' : '';

    //check productImage sent and valid
    if (!req.files) {
        errorsFound += activity === 'addProduct' ?  'no product image supplied and uploaded \n' : ''; //sending product image mandatory only for add product
    }
    else {
        let prodImage = req.files.productImage;  //sampleFile.name   sampleFile.data.length
        errorsFound += validations.fileTooLarge(prodImage) ? 'product image larger than 5MB - actual size: ' + prodImage.data.length + ' bytes \n' : '';
        errorsFound += validations.fileExtensionInvalid(prodImage) ? 'file extension invalid - valid extensions are: jpg, jpeg, png or gif' : '';
    }
    return errorsFound;
}

function saveProductImage(req, productID, callback) {

    let imageFile = req.files.productImage;
    imageFile.mv('product_images/image_for_product_id_' + productID + '.jpg', function(err) {
        if (err) {
            logError.writeToErrorLog('called by productController.saveProductImage => moving product image to product_images folder failed: ' + err);
            console.log('saveProductImage: error ' + err);
            callback('\nhowever uploading product image failed!');
        }
        callback(null); //null there was no error
    });
}

module.exports.getProducts = getProducts;
module.exports.addUpdateProduct = addUpdateProduct;
