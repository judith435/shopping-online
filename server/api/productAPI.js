const productCtrl = require("../controllers/productController");
const logError = require("../share/errorLogging.js");
const sr = require("../share/serverResponse.js");

function getProducts(req, res) {
  // req.session.destroy();

  let sess;
  sess = req.session;
  if (!sess["customerInfo"]) { //user not logged in
    var response =  new sr.ServerResponse("userNotLoggedIn", "");
    res.end(JSON.stringify(response));
    return;
  }
  else {
    console.log("sess[customerInfo]:  " + JSON.stringify(sess["customerInfo"]));
    console.log("userInfo from client :  " + JSON.stringify(JSON.parse(req.query.user)));
  }

  productCtrl.getProducts(function(err, products) {
      if (err) {
        logError.writeToErrorLog("called by productAPI.getProducts => " + err);
        var response =  new sr.ServerResponse("error", err);
      }
      else {
        var response =  new sr.ServerResponse("ok", products);
      }
      res.end(JSON.stringify(response));
  })
}

function addProduct(req, res) {
  addUpdateProduct("addProduct", req, res);
}

function updateProduct(req, res) {
  addUpdateProduct("updateProduct", req, res);
}

function addUpdateProduct(activity, req, res) {
  console.log("addUpdateProduct req.body:  " + JSON.stringify(req.body));
  productCtrl.addUpdateProduct(activity, req, function(err, response, invalidInputDetails) {
    if (err) {
      logError.writeToErrorLog("called by productAPI.addUpdateProduct => " + err);
      var response =  new sr.ServerResponse("error", err);
    }
    else {
      if (response) { //insert/update successfull
        let content = activity === "addProduct" ? "product added successfully => new productID: " +  response : "product updated successfully" ;
        var response =  new sr.ServerResponse("ok", content);

      }
      else { //invalidInputDetails
        var response =  new sr.ServerResponse("invalid input", "invalid input =>  following erors were found: \n" + invalidInputDetails); 
      }
    }
    res.end(JSON.stringify(response));
  })
}


module.exports.getProducts = getProducts;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
