const bl = require('../bl/cartBL');
const model = require('../models/cartModel');

function getLastCart(req, callback) {

    bl.category.getLastCart(function(err, lastCart) {
        if (err) {
            callback('called by cartController.getLastCart => ' + err);
        }
        callback(null, categoryArray);
    })
}


function addCart(teudat_zehut, callback) {

 //   const cart = new model.Cart(JSON.parse(req.query.cart));

    bl.addCart(teudat_zehut, function(err, cartID) {
        if (err) {
            callback('called by cartController.addCart => ' + err, null);
        }
        else {
            callback(null, cartID);
        }
    })
}

module.exports.getLastCart = getLastCart;
module.exports.addCart = addCart;
