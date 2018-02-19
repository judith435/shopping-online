const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const apiLogin = require('./api/loginAPI.js');
const apiCategory = require('./api/categoryAPI.js');
const apiProduct = require('./api/productAPI.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static('../client'));
app.use(express.static('../node_modules'));
app.use(express.static('product_images'));

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: 'gunibush',
    resave: true,
    saveUninitialized: true
}));

// Listen to '/' in GET Verb methods - serve the main Angular index.html file
app.get('/', function (req, res) {

    fs.readFile('client/index.html', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        res.end(data) 
    });
   
});


app.get('/login', apiLogin.getLoginInfo);
app.post('/login', apiLogin.login);

app.get('/category/ddl', apiCategory.getCategoryDDL);
app.get('/product', apiProduct.getProducts);
app.post('/product', apiProduct.addProduct);
app.put('/product', apiProduct.updateProduct);

var server = app.listen(8085, function () {
})