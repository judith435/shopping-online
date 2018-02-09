const fs = require('fs');

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

  if (!req.files) {
       return res.status(400).send('No files were uploaded');
  }
  let sampleFile = req.files.productImage;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`uploads/${sampleFile.name}`, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send('File uploaded!');
  });

  // productCtrl.addProduct(function(err, product) {
  //     if (err) {
  //         res.end('Sorry Dude! '+ err);
  //     }
  //     res.end(JSON.stringify(product));
  // })
}

function uploadProductImage(req, statusCode) {

  if (!req.files) {
    statusCode = 400; 
    logError('product image not uploaded to server');
    return
  }

  let sampleFile = req.files.productImage;
  sampleFile.mv(`uploads/${sampleFile.name}`, function(err) {
    if (err) {
      statusCode = 500; 
      logError(err);
      return
    }
  });

  logError('all ok');
}


function logError(error) {

  fs.writeFile('errorLog.txt', error, (err) => {  
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log('error log saved!');
  });
}

module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;