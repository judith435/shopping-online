const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const apiCart = require("./api/cartAPI.js");
const apiCategory = require("./api/categoryAPI.js");
const apiCustomer = require("./api/customerAPI.js");
const apiLogin = require("./api/loginAPI.js");
const apiOrder = require("./api/orderAPI.js");
const apiProduct = require("./api/productAPI.js");
const apiStore = require("./api/storeAPI.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("../client"));
app.use(express.static("../node_modules"));
app.use(express.static("product_images"));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "gunibush",
    resave: true,
    saveUninitialized: true
}));

// Listen to "/" in GET Verb methods - serve the main Angular index.html file
app.get("/", function (req, res) {

    fs.readFile("client/index.html", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        }
        res.end(data); 
    });
});

app.get("/store", apiStore.getStatistics);

app.get("/login", apiLogin.checkUserLoggedIn);
app.post("/login", apiLogin.login);
app.delete("/login", apiLogin.logout);

app.get("/customer/duplicate", apiCustomer.getDuplicateCustomer);
app.post("/customer", apiCustomer.addCustomer);

app.get("/cart", apiCart.getLastCart);
app.post("/cart", apiCart.addCart);

app.get("/cartItem", apiCart.getCartItems);
app.post("/cartItem", apiCart.addCartItem);
app.delete("/cartItem", apiCart.deleteCartItem);
app.delete("/cartItem/all", apiCart.clearCart);

app.get("/category", apiCategory.getCategories);

app.get("/product", apiProduct.getProducts);
app.post("/product", apiProduct.addProduct);
app.put("/product", apiProduct.updateProduct);

app.get("/order", apiOrder.getDeliveryDates);
app.post("/order", apiOrder.addOrder);

var server = app.listen(8085, function () {
    console.log("shopping app started");
});