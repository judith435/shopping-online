const bl = require('../bl/orderBL');
const model = require('../models/orderModel');
const validations = require('../share/validations');

function getDeliveryDates(callback) {

    bl.getDeliveryDates(function(err, deliveryDates) {
        if (err) {
            callback('called by orderController.getDeliveryDates => ' + err);
        }
        else {
            callback(null, deliveryDates);
        }
    })
}


function addOrder(req, callback) {

    const order = new model.Order(JSON.parse(req.query.order));
    const inputErrorsFound = orderValid(order);

    if (!inputErrorsFound) {
        bl.addOrder(order, function(err, response) {
            if (err) {
                callback('called by orderController.addOrder => ' + err, null, null);
            }
            else {
                callback(null, response, null);
            }
        })
    }
    else {
        callback(null, null, inputErrorsFound); 
    }
}

function orderValid(order) {
    let errorsFound = '';

    // errorsFound  = validations.inputEmpty(order.firstName) ?  'First Name required \n' : '';
    // errorsFound += validations.inputEmpty(order.city) ? 'city required \n' : '';

    return errorsFound;
}

module.exports.getDeliveryDates = getDeliveryDates;
module.exports.addOrder = addOrder;
