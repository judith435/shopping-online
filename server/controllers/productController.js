const bl = require('../bl/productBL');
const model = require('../models/productModel');
const validations = require('../share/validations');
//productCtrl.addProduct(req, function(err, response) {
function addProduct(req, callback) {
    console.log('>>> productController: ' + JSON.stringify(req.body));
    const product = new model.Product(req.body);
    const inputErrorsFound = productValid(product, req);
    if (!inputErrorsFound) {
        bl.product.addProduct(product, function(err, newProductID) {
            if (err) {
                callback('called by productController.addProduct => ' + err);
            }

            saveProductImage(req, newProductID, function (err) {
                if (err) {
                    callback('called by productController.addProduct => ' + err);
                }
                else {
                    console.log('****** gundelush ******* ');

                    callback(null, newProductID);
                }
            });
        })
    }
    else {
        callback(null, 'invalid input =>  following erors were found: \n' + inputErrorsFound); 
    }
}

function productValid(product,req) {
    let errorsFound = '';

    errorsFound  = validations.inputEmpty(product.name) ?  'product name required \n' : '';
    errorsFound += !validations.inputValidAmount(product.price) ? 'product price up to 9999.99 $ required \n' : '';
    errorsFound += validations.inputEmpty(product.category) ? 'product category required \n' : '';

    //check productImage sent and valid
    if (!req.files) {
        errorsFound += 'no product image supplied and uploaded \n';
    }
    else {
        let prodImage = req.files.productImage;  //sampleFile.name   sampleFile.data.length
        errorsFound += validations.fileTooLarge(prodImage) ? 'product image larger than 5MB - actual size: ' + prodImage.data.length + ' bytes \n' : '';
        errorsFound += validations.fileExtensionInvalid(prodImage) ? 'file extension invalid - valid extensions are: jpg, jpeg, png or gif' : '';
    }
    return errorsFound;
}

function saveProductImage(req, newProductID, callback) {

    let imageFile = req.files.productImage;
    console.log('#### saveProductImage: befores move ' );

    imageFile.mv('product_images/image_for_productID_' + newProductID + '.jpg', function(err) {
        if (err) {
            console.log('saveProductImage: error ' + err);
            callback('called by productController.saveProductImage => moving product image to product_images folder failed: ' + err);
        }
        //callback
    });
}

module.exports.addProduct = addProduct;
