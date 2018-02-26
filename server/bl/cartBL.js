const dal = require('..//dal/dal');
const parmObject = require('..//dal/spParm');

function getLastCart(callback) {
    dal.executeQuery('shopping', 'get_last_cart', '',function(err, rows) {
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

function addCart(teudat_zehut, callback) { 

    const spParms = []; 
    spParms.push(new parmObject.spParm(teudat_zehut, false));
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

module.exports.addCart = addCart;