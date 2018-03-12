const productCtrl = require("../controllers/productController");
const logError = require("../share/errorLogging.js");
const sr = require("../share/serverResponse.js");

var response;

function getProducts(req, res) {
  //console.log("^^^^^ req.query.source:  " + JSON.stringify(req.query.source));
  let sess = req.session;
  //user not logged in or customer attempting to access update product panel
  if (!sess["customerInfo"] || (sess["customerInfo"].role === "customer" && req.query.source !== "/shop" )) { 
    response =  new sr.ServerResponse("forbiddenAccessAttempted", "");
    res.end(JSON.stringify(response));
    return;
  }
  // else {
  //   console.log("sess[customerInfo]:  " + JSON.stringify(sess["customerInfo"]));
  //   console.log("userInfo from client :  " + JSON.stringify(JSON.parse(req.query.user)));
  // }

  productCtrl.getProducts(function(err, products) {
      if (err) {
        logError.writeToErrorLog("called by productAPI.getProducts => " + err);
        response =  new sr.ServerResponse("error", err);
      }
      else {
        response =  new sr.ServerResponse("ok", products);
      }
      res.end(JSON.stringify(response));
  });
}

function addUpdateProduct(activity, req, res) {

  let sess = req.session;
  //user not logged in or customer attempting to update product
  if (!sess["customerInfo"] || (sess["customerInfo"].role === "customer")) { 
    response =  new sr.ServerResponse("forbiddenAccessAttempted", "");
    res.end(JSON.stringify(response));
    return;
  }

  console.log("addUpdateProduct req.body:  " + JSON.stringify(req.body));
  productCtrl.addUpdateProduct(activity, req, function(err, response, invalidInputDetails) {
    if (err) {
      logError.writeToErrorLog("called by productAPI.addUpdateProduct => " + err);
      response =  new sr.ServerResponse("error", err);
    }
    else {
      if (response) { //insert/update successfull
        let content = activity === "addProduct" ? "product added successfully => new productID: " +  response : "product updated successfully" ;
        response =  new sr.ServerResponse("ok", content);

      }
      else { //invalidInputDetails
        response =  new sr.ServerResponse("invalid input", "invalid input =>  following erors were found: \n" + invalidInputDetails); 
      }
    }
    res.end(JSON.stringify(response));
  });
}

function addProduct(req, res) {
  addUpdateProduct("addProduct", req, res);
}

function updateProduct(req, res) {
  addUpdateProduct("updateProduct", req, res);
}

module.exports.getProducts = getProducts;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
