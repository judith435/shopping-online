const bl = require('../bl/cartBL');
const model = require('../models/cartItemModel');

function getLastCart(teudatZehut, callback) {

    bl.getLastCart(teudatZehut, function(err, lastCart) {
        if (err) {
            callback('called by cartController.getLastCart => ' + err);
        }
        callback(null, lastCart);
    })
}


function addCart(teudatZehut, callback) {

 //   const cart = new model.Cart(JSON.parse(req.query.cart));

    bl.addCart(teudatZehut, function(err, cartID) {
        if (err) {
            callback('called by cartController.addCart => ' + err, null);
        }
        else {
            callback(null, cartID);
        }
    })
}

function addCartItem(req, callback) {

    const cartItem = new model.CartItem(JSON.parse(req.query.cartItem));
   
    bl.addCartItem(cartItem, function(err, cartItemID) {
        if (err) {
            callback('called by cartController.addCartItem => ' + err, null);
        }
        else {
            callback(null, cartItemID);
        }
    })
}
   
module.exports.getLastCart = getLastCart;
module.exports.addCart = addCart;
module.exports.addCartItem = addCartItem;
