const dal = require('..//dal/dal');
const parmObject = require('..//dal/spParm');
const cartModel = require('../models/cartModel');
const cartItemModel = require('../models/cartItemModel');

function getLastCart(teudatZehut, callback) {

    const spParms = []; 
    spParms.push(new parmObject.spParm(teudatZehut, false));
    dal.executeQuery('shopping', 'get_last_cart', spParms, function(err, rows) {
        if (err) {
            callback('called by cartBL.getLastCart => ' + err);
        }
        else {
            if(rows[0][0]) { //cart info found for customer
                let lastCart = new cartModel.Cart(rows[0][0]); 
                callback(null, lastCart);
            }
            callback(null, 'no cart found for customer');
        }
    });
}

function getCartItems(cartID, callback) {

    const spParms = []; 
    spParms.push(new parmObject.spParm(cartID, false));
    dal.executeQuery('shopping', 'get_last_cart_items', spParms, function(err, rows) {
        if (err) {
            callback('called by cartBL.getCartItems => ' + err);
        }
        else {
            const cartItemsArray = [];
            rows[0].forEach(function (row) {
                cartItemsArray.push(new cartItemModel.CartItem(row));
            });
            callback(null, cartItemsArray);
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

function deleteCartItem(cartItemID, callback) {

    const spParms = []; 
    spParms.push(new parmObject.spParm(cartItemID, false));
    dal.executeQuery('shopping', 'delete_cart_item', spParms, function(err, response) {
        if (err) {
            callback('called by cartBL.deleteCartItem => ' + err);
        }
        else {
            callback(null, response.affectedRows);
        }
    });
}

module.exports.getLastCart = getLastCart;
module.exports.getCartItems = getCartItems;
module.exports.addCart = addCart;
module.exports.addCartItem = addCartItem;
module.exports.deleteCartItem = deleteCartItem;
