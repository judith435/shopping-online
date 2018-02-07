function addProduct(req, res) {
    if (!req.files) {
         return res.status(400).send('No files were uploaded.');
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

module.exports.addProduct = addProduct;