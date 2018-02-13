const productCtrl = require('../controllers/productController');
const logError = require('../share/errorLogging.js');
const sr = require('../share/serverResponse.js');

function addProduct(req, res) {
  console.log('addProduct req.body:  ' + req.body);
  console.log('addProduct req.body:  ' + JSON.stringify(req.body));
  productCtrl.addProduct(req, function(err, response) {
    if (err) {
      logError.writeToErrorLog('called by productAPI.addProduct => ' + err);
      var response =  new sr.ServerResponse('error', err);
     // res.end(JSON.stringify(err));  str.substring(1, 4);
      // if(JSON.stringify( err.startsWith('following erors were found in input'))) { //if (pathname.substring(0, 6) == "/sub/1") 
      //   res.end(err);
      // }
      // else { //genaral error occures
      //   logError.writeToErrorLog('error in add product: ' + err);
      //   res.end('Adding product failed - please contact support center ');
      // }
    }
    else {
      //console.log('~~~~~ IMPORTANT response ' + JSON.stringify(response) + '  >>>  ' + response);
      if (response.substr(0, 1) === '!') { //! indicates input errors were found
        var response =  new sr.ServerResponse('invalid input', 
          'invalid input =>  following erors were found: \n' + response.substr(1)); //remove ! error indicator
      }
      else {
        var response =  new sr.ServerResponse('ok', 'product added successfully => new productID = ' +  response);
        // console.log('~~~~~ response from insert ' + JSON.stringify(response));
      }
    }
    res.end(JSON.stringify(response));
  })
}

function updateProduct(req, res) {

}

module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;