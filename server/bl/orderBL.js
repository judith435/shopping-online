const dal = require('..//dal/dal');
const parmObject = require('..//dal/spParm');

function addOrder(order, callback) {
    const spParms = []; 
    spParms.push(new parmObject.spParm(order.customer, false));
    spParms.push(new parmObject.spParm(order.shoppingCart, false));
    spParms.push(new parmObject.spParm(order.price, false));
    spParms.push(new parmObject.spParm(order.deliveryCity, true));
    spParms.push(new parmObject.spParm(order.deliveryStreet, true));
    spParms.push(new parmObject.spParm(order.deliveryDate, true));
    spParms.push(new parmObject.spParm(order.ccInfo, false));

    dal.executeQuery('shopping', 'insert_order', spParms, function(err, rows) {
        if (err) {
            callback('called by orderBL.addOrder => ' + err, null, null);
            return;
        }
        callback(null, 'order added successfully', null);
    });
}

module.exports.addOrder = addOrder;
