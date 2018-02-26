const bl = require('../bl/cartBL');

function getLastCart(teudat_zehut, callback) {

    bl.getLastCart(teudat_zehut, function(err, lastCart) {
        if (err) {
            callback('called by cartController.getLastCart => ' + err);
        }
        callback(null, lastCart);
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
