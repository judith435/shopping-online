const logError = require('../share/errorLogging.js');

function addProduct(req, res) {
  console.log('addProduct req.body:  ' + req.body);
  console.log('addProduct req.body:  ' + JSON.stringify(req.body));
  var statusCode = 0;
  uploadProductImage(req, statusCode);
  if (statusCode) {
    res.status(statusCode).send('error uploading product image => product save failed');
  }

  res.send('File uploaded!');

  // productCtrl.addProduct(function(err, product) {
  //     if (err) {
  //         res.end('Sorry Dude! '+ err);
  //     }
  //     res.end(JSON.stringify(product));
  // })
}


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

  let sampleFile = req.files.productImage;
  sampleFile.mv(`uploads/${sampleFile.name}`, function(err) {
    if (err) {
      statusCode = 500; 
      logError.writeToErrorLog(err);
      return
    }
  });

  logError.writeToErrorLog('all ok');
}


module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;