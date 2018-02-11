const productCtrl = require('../controllers/productController');
const logError = require('../share/errorLogging.js');

function addProduct(req, res) {
      console.log('addProduct req.body:  ' + req.body);
      console.log('addProduct req.body:  ' + JSON.stringify(req.body));
  var statusCode = 0;
  uploadProductImage(req, statusCode);
  if (statusCode) {
    res.status(statusCode).send('error uploading product image => product save failed');
  }
  else { //product image uploaded successfully - continue wih save to db 
    productCtrl.addProduct(req, function(err, newProductID) {
        if (err) {
          res.end(JSON.stringify(err));
          // if(JSON.stringify( err.startsWith('following erors were found in input'))) { //if (pathname.substring(0, 6) == "/sub/1") 
          //   res.end(err);
          // }
          // else { //genaral error occures
          //   logError.writeToErrorLog('error in add product: ' + err);
          //   res.end('Adding product failed - please contact support center ');
          // }
        }
        res.end('product added successfully => new productID = ' +  newProductID);
    })
  }
}
//"Hello World!".startsWith("He");

function updateProduct(req, res) {
  var tala = req.body;
  console.log('updateProduct req.body:  ' + tala);
  console.log('updateProduct req.body:  ' + JSON.stringify(tala));

  var statusCode = 0;
  uploadProductImage(req, statusCode);
  if (statusCode) {
    res.status(statusCode).send('error uploading product image => product save failed');
  }

  res.send('File uploaded!');

}

function uploadProductImage(req, statusCode) {

  if (!req.files) {
    statusCode = 400; 
    logError.writeToErrorLog('product image not uploaded to server');
    return
  }

  // let sampleFile = req.files.productImage;
  //   sampleFile.mv(`uploads/image.jpg`, function(err) {
  //   if (err) {
  //     statusCode = 500; 
  //     logError.writeToErrorLog(err);
  //     return
  //   }
  // });

}

module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;