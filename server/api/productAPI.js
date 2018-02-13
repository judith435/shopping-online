const productCtrl = require('../controllers/productController');
const logError = require('../share/errorLogging.js');
const sr = require('../share/serverResponse.js');

function getProducts(req, res) {
  productCtrl.getProducts(function(err, products) {
      if (err) {
        logError.writeToErrorLog('called by productAPI.getProducts => ' + err);
        var response =  new sr.ServerResponse('error', err);
      }
      else {
        var response =  new sr.ServerResponse('ok', products);
      }
      res.end(JSON.stringify(response));
  })
}

function addProduct(req, res) {
  console.log('addProduct req.body:  ' + req.body);
  console.log('addProduct req.body:  ' + JSON.stringify(req.body));
  productCtrl.addProduct(req, function(err, newProductID, invalidInputDetails) {
    if (err) {
      logError.writeToErrorLog('called by productAPI.addProduct => ' + err);
      var response =  new sr.ServerResponse('error', err);
    }
    else {
      if (newProductID) { 
        var response =  new sr.ServerResponse('ok', 'product added successfully => new productID: ' +  newProductID);

      }
      else { //invalidInputDetails
        var response =  new sr.ServerResponse('invalid input', 'invalid input =>  following erors were found: \n' + invalidInputDetails); 
      }
    }
    res.end(JSON.stringify(response));
  })
}

function updateProduct(req, res) {

}

module.exports.getProducts = getProducts;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;