const dal = require("..//dal/dal");
const parmObject = require("..//dal/spParm");
const model = require("../models/deliveryDateModel");

function getDeliveryDates(callback) {
    dal.executeQuery("shopping", "get_filled_delivery_dates", "",function(err, rows) {
        if (err) {
            callback("called by orderBL.getDeliveryDates => " + err);
        }
        else {
            const deliveryDates = [];
            rows[0].forEach(function (row) {
                deliveryDates.push(new model.DeliveryDate(row));
            });
            callback(null, deliveryDates);
        }
    });
}


function addOrder(order, callback) {
    const spParms = []; 
    spParms.push(new parmObject.spParm(order.customer, false));
    spParms.push(new parmObject.spParm(order.shoppingCart, false));
    spParms.push(new parmObject.spParm(order.price, false));
    spParms.push(new parmObject.spParm(order.deliveryCity, true));
    spParms.push(new parmObject.spParm(order.deliveryStreet, true));
    spParms.push(new parmObject.spParm(order.deliveryDate, true));
    spParms.push(new parmObject.spParm(order.ccInfo.substring(12), false));

    dal.executeQuery("shopping", "insert_order", spParms, function(err, rows) {
        if (err) {
            callback("called by orderBL.addOrder => " + err, null, null);
            return;
        }
        callback(null, "order added successfully", null);
    });
}

module.exports.getDeliveryDates = getDeliveryDates;
module.exports.addOrder = addOrder;
