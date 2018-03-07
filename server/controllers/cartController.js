const bl = require("../bl/cartBL");
const model = require("../models/cartItemModel");

function getLastCart(teudatZehut, callback) {

    bl.getLastCart(teudatZehut, function(err, lastCart) {
        if (err) {
            callback("called by cartController.getLastCart => " + err);
        }
        callback(null, lastCart);
    });
}

function getCartItems(cartID, callback) {

    bl.getCartItems(cartID, function(err, cartItems) {
        if (err) {
            callback("called by cartController.getCartItems => " + err, null);
        }
        else {
            callback(null, cartItems);
        }
    });
}
   
function addCart(teudatZehut, callback) {

 //   const cart = new model.Cart(JSON.parse(req.query.cart));

    bl.addCart(teudatZehut, function(err, cartID) {
        if (err) {
            callback("called by cartController.addCart => " + err, null);
        }
        else {
            callback(null, cartID);
        }
    });
}

function addCartItem(req, callback) {

    const cartItem = new model.CartItem(JSON.parse(req.query.cartItem));
   
    bl.addCartItem(cartItem, function(err, cartItemID) {
        if (err) {
            callback("called by cartController.addCartItem => " + err, null);
        }
        else {
            callback(null, cartItemID);
        }
    })
}

function deleteCartItem(cartItemID, callback) {

    bl.deleteCartItem(cartItemID, function(err, affectedRows) {
        if (err) {
            callback("called by cartController.deleteCartItem => " + err, null);
        }
        else {
            callback(null, affectedRows);
        }
    })
}

function clearCart(cartID, callback) {

    bl.clearCart(cartID, function(err, affectedRows) {
        if (err) {
            callback("called by cartController.clearCart => " + err, null);
        }
        else {
            callback(null, affectedRows);
        }
    })
}

module.exports.getLastCart = getLastCart;
module.exports.getCartItems = getCartItems;
module.exports.addCart = addCart;
module.exports.addCartItem = addCartItem;
module.exports.deleteCartItem = deleteCartItem;
module.exports.clearCart = clearCart;
