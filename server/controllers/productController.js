const bl = require('../bl/productBL');
const model = require('../models/productModel');
const validations = require('../share/validations');
const logError = require('../share/errorLogging.js');
const fs = require('fs');

function addProduct(req, callback) {
    console.log('>>> productController: ' + JSON.stringify(req.body));
    const product = new model.Product(req.body);
    const inputErrorsFound = productValid(product);
    if (!inputErrorsFound) {
        bl.product.addProduct(product, function(err, newProductID) {
            if (err) {
                callback(err);
            }

            saveProductImage(req, newProductID);
            callback(null, newProductID);
        })
    }
    else {
        callback('following erors were found in input ' + inputErrorsFound);
    }
}

function productValid(product) {
    var errorsFound = '';

    if (!validations.inputNotEmpty(product.name)) {
        errorsFound = 'product name required';
    }

    if (!validations.inputNotEmpty(product.price)) {
        errorsFound += errorsFound ? ', ' : '' ;
        errorsFound += 'product price up to 9999.99 $ required';
    }

    if (!validations.inputNotEmpty(product.category)) {
        errorsFound += errorsFound ? ', ' : '' ;
        errorsFound += 'product category  required';
    }

    return errorsFound;
}

function saveProductImage(req, newProductID) {
    let imageFile = req.files.productImage;
    imageFile.mv( 'product_images/image_for_productID_' + newProductID + '.jpg', function(err) {
        if (err) {
            statusCode = 500; 
            logError.writeToErrorLog(err);
        }
    });



    // fs.rename('uploads/image.jpg', 'product_images/image_for_productID_' + newProductID + '.jpg', function (err) {
    //     if (err) {
    //         logError.writeToErrorLog(err);
    //         throw err;
    //     }
    // });


    // let sampleFile = req.files.productImage;
    // //sampleFile.mv(`product_images/${sampleFile.image_for_productID_ + newProductID }`, function(err) {
    // let newFileName =   'image_for_productID_' + newProductID;
    // sampleFile.mv(`image_for_productID_/${newFileName}`, function(err) {
    // if (err) {
    //     statusCode = 500; 
    //     logError.writeToErrorLog(err);
    //     return
    //   }
    // });
  
}

module.exports.addProduct = addProduct;


// $scope.name_errorMessage = !$scope.product.name  ? 'Name required' : '';
// $scope.errorsFound = $scope.name_errorMessage !== '' || $scope.errorsFound;
// $scope.price_errorMessage = !$scope.product.price ? 'Price up to 9999.99 $ required' : '';
// $scope.errorsFound = $scope.price_errorMessage !== '' || $scope.errorsFound;
// $scope.category_errorMessage = !$scope.product.category ? 'Category  required' : '';
// $scope.errorsFound = $scope.category_errorMessage !== '' || $scope.errorsFound;
// $scope.productImage_errorMessage = !$scope.productImage ? 'Product Image  required' : '';
// $scope.errorsFound = $scope.productImage_errorMessage !== '' || $scope.errorsFound;
