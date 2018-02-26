const dal = require('..//dal/dal');
const parmObject = require('..//dal/spParm');
const model = require('../models/cartModel');

function getLastCart(teudatZehut, callback) {

    const spParms = []; 
    spParms.push(new parmObject.spParm(teudatZehut, false));
    dal.executeQuery('shopping', 'get_last_cart', spParms, function(err, rows) {
        if (err) {
            callback('called by cartBL.getLastCart => ' + err);
        }
        else {
            if(rows[0][0]) { //cart info found for customer
                let lastCart = new model.Cart(rows[0][0]); 
                callback(null, lastCart);
            }
            callback(null, 'no cart found for customer');
        }
    });
}

function addCart(teudatZehut, callback) { 

    const spParms = []; 
    spParms.push(new parmObject.spParm(teudatZehut, false));
    // console.log('!!! in bl  spParms: ' + JSON.stringify(spParms));
    dal.executeQuery('shopping', 'insert_cart', spParms, function(err, rows) {
        if (err) {
            callback('called by cartBL.addCart ' + err);
        }
        else {
            callback(null, rows[0][0].new_cart_id);
        }
    });
}

function addCartItem(cartItem, callback) { 

    const spParms = []; 
    spParms.push(new parmObject.spParm(cartItem.productID, false));
    spParms.push(new parmObject.spParm(cartItem.quantity, false));
    spParms.push(new parmObject.spParm(cartItem.price, false));
    spParms.push(new parmObject.spParm(cartItem.shoppingCart, false));

    dal.executeQuery('shopping', 'insert_shopping_cart_item', spParms, function(err, rows) {
        if (err) {
            callback('called by cartBL.addCart ' + err);
        }
        else {
            callback(null, rows[0][0].new_cart_item_id);
        }
    });
}

module.exports.getLastCart = getLastCart;
module.exports.addCart = addCart;
module.exports.addCartItem = addCartItem;
