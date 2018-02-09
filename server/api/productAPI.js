function addProduct(req, res) {
  console.log('addProduct req.body:  ' + req.body);
  console.log('addProduct req.body:  ' + JSON.stringify(req.body));
  var fus = new fileUploadStatus(0, '');
  uploadProductImage(req, fus);
  if (fus.status !== 0) {
    res.status(fu.status).send(fu.errorMessage);
  }

  res.send('File uploaded!');

  // productCtrl.addProduct(function(err, product) {
  //     if (err) {
  //         res.end('Sorry Dude! '+ err);
  //     }
  //     res.end(JSON.stringify(product));
  // })
}

function fileUploadStatus (status, errorMessage) {
  this.status = status;
  this.errorMessage = errorMessage;
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

function uploadProductImage(req, fus) {

  if (!req.files) {
    fus.status = 400; 
    fus.errorMessage =  'No files were uploaded';
    return
  }

  let sampleFile = req.files.productImage;
  sampleFile.mv(`uploads/${sampleFile.name}`, function(err) {
    if (err) {
      fus.status = 500; 
      fus.errorMessage =  err;
      return
    }
  });
}


module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;