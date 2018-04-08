//all string mysql string parameters (parmObject.SPparm("parm name", true)) have any ' escaped
//reason mysql fails if string contains unescaped apostrophe

const dal = require("..//dal/dal");
const parmObject = require("..//dal/SPparm");
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
    spParms.push(new parmObject.SPparm(order.customer, false));
    spParms.push(new parmObject.SPparm(order.shoppingCart, false));
    spParms.push(new parmObject.SPparm(order.price, false));

    let deliveryCity = order.deliveryCity.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(deliveryCity, true));

    let deliveryStreet = order.deliveryStreet.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(deliveryStreet, true));

    spParms.push(new parmObject.SPparm(order.deliveryDate, true));
    spParms.push(new parmObject.SPparm(order.ccInfo.substring(12), false));

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
