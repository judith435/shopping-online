const express = require('express');
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const apiCategory = require('./api/categoryAPI.js');
const apiProduct = require('./api/productAPI.js');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static('../client'));
app.use(express.static('../node_modules'));
app.use('/public', express.static(path.join(__dirname, 'public')))

// Listen to '/' in GET Verb methods - serve the main Angular index.html file
app.get('/', function (req, res) {

    fs.readFile('client/index.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.end(data) 
    });
   
});

app.get('/category/ddl', apiCategory.getCategoryDDL);

app.post('/product', apiProduct.addProduct);
// app.post('/product', function(req, res) {
//     if (!req.files)
//       return res.status(400).send('No files were uploaded.');
   
//      // console.log(req.files);
//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     let sampleFile = req.files.productImage;
   
//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv(`uploads/${sampleFile.name}`, function(err) {
//       if (err)
//         return res.status(500).send(err);
   
//       res.send('File uploaded!');
//     });
//   });
  


var server = app.listen(8085, function () {

})