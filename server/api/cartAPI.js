const sr = require("../share/serverResponse.js");
const logError = require("../share/errorLogging.js");
const cartCtrl = require("../controllers/cartController");

var response;

function getLastCart(req, res) {

    cartCtrl.getLastCart(req.query.teudatZehut, function(err, lastCart) {
        if (err) { 
            logError.writeToErrorLog("called by cartAPI.getLastCart => " + err);
            response =  new sr.ServerResponse("error", err);
        }
        else {
            response =  new sr.ServerResponse("ok", lastCart);
        }
        res.end(JSON.stringify(response));
    });
}

function getCartItems(req, res) {
    let sess = req.session;
    //user not logged in attempting to access shopping panel
    console.log("sess[customerInfo]:  " + JSON.stringify(sess["customerInfo"]));
    if (!sess["customerInfo"]) { 
      response =  new sr.ServerResponse("forbiddenAccessAttempted", "");
      res.end(JSON.stringify(response));
      return;
    }

    cartCtrl.getCartItems(req.query.cartID, function(err, cartItems) {
        if (err) { 
            logError.writeToErrorLog("called by cartAPI.getCartItems => " + err);
            response =  new sr.ServerResponse("error", err);
        }
        else {
            response =  new sr.ServerResponse("ok", cartItems);
        }
        res.end(JSON.stringify(response));
    });
}

function addCart(req, res) {
    let sess = req.session;
    //user not logged in attempting to access shopping panel
    console.log("sess[customerInfo]:  " + JSON.stringify(sess["customerInfo"]));
    if (!sess["customerInfo"]) { 
      response =  new sr.ServerResponse("forbiddenAccessAttempted", "");
      res.end(JSON.stringify(response));
      return;
    }
                                        
    cartCtrl.addCart(req.query.teudatZehut, function(err, cartID) {
        if (err) {
          logError.writeToErrorLog("called by cartAPI.addCart => " + err);
           response =  new sr.ServerResponse("error", err);
        }
        else {
           response =  new sr.ServerResponse("ok", cartID);
        }
        res.end(JSON.stringify(response));
    });
}

function addCartItem(req, res) {
                                            
    cartCtrl.addCartItem(req, function(err, cartItemID) {
        if (err) {
          logError.writeToErrorLog("called by cartAPI.addCartItem => " + err);
          response =  new sr.ServerResponse("error", err);
        }
        else {
            response =  new sr.ServerResponse("ok", cartItemID);
        }
        res.end(JSON.stringify(response));
    });
}

function deleteCartItem(req, res) {
                                            
    cartCtrl.deleteCartItem(req.query.cartItemID, function(err, affectedRows) {
        if (err) {
          logError.writeToErrorLog("called by cartAPI.deleteCartItem => " + err);
          response =  new sr.ServerResponse("error", err);
        }
        else {
            response =  new sr.ServerResponse("ok", affectedRows);
        }
        res.end(JSON.stringify(response));
    });
}

function clearCart(req, res) {
    let sess = req.session;
    //user not logged in attempting to access shopping panel
    if (!sess["customerInfo"]) { 
        response =  new sr.ServerResponse("forbiddenAccessAttempted", "");
        res.end(JSON.stringify(response));
        return;
    }
                                          
    cartCtrl.clearCart(req.query.cartID, function(err, affectedRows) {
        if (err) {
          logError.writeToErrorLog("called by cartAPI.clearCart => " + err);
          response =  new sr.ServerResponse("error", err);
        }
        else {
            response =  new sr.ServerResponse("ok", affectedRows);
        }
        res.end(JSON.stringify(response));
    });
}


module.exports.getLastCart = getLastCart;
module.exports.getCartItems = getCartItems;
module.exports.addCart = addCart;
module.exports.addCartItem = addCartItem;
module.exports.deleteCartItem = deleteCartItem;
module.exports.clearCart = clearCart;
