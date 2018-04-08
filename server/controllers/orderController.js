const bl = require("../bl/orderBL");
const model = require("../models/orderModel");
const validations = require("../share/validations");
const logError = require("../share/errorLogging.js");

function getDeliveryDates(callback) {

    bl.getDeliveryDates(function(err, deliveryDates) {
        if (err) {
            callback("called by orderController.getDeliveryDates => " + err);
        }
        else {
            callback(null, deliveryDates);
        }
    });
}

function orderValid(order, filledDates) {
    let errorsFound = "";

    errorsFound  =  validations.inputEmpty(order.deliveryCity) ?  "city required \n" : "";
    errorsFound +=  validations.inputEmpty(order.deliveryStreet) ? "street required \n" : "";
    errorsFound += !validations.dateValid(order.deliveryDate) ? "valid delivery date required \n" : "";
    errorsFound += !validations.creditCardValid(order.ccInfo) ? "valid credit card required \n" : "";
    if (filledDates) { //if call to mysql for filledDates failed => filledDates empty do NOT perform test
        let dateFilled = filledDates.indexOf(order.deliveryDate) >= 0;
        errorsFound += dateFilled ? "3 deliveries already scheduled for delivery date selected \n" : "";
    }
    return errorsFound;
}

function addOrder(req, callback) {

    var order;
    try {
            order = new model.Order(JSON.parse(req.query.order));
    } catch(err) {
        callback("called by orderController.addOrder : JSON.parse(req.query.order) error  =>" + err, null, null);
    }

    var filledDates;

    //check delivery date not filled => more than 3 deliveries sheduled for same day versus mysql
    //this must be performed here as callback => processing (checking data => orderValid, inserting to mysql => bl.addOrder) 
    //can only occur after deliveryDates returned from database 
    getDeliveryDates(function(err, deliveryDates) {
        if (err) {
            logError.writeToErrorLog("called by orderController.getDeliveryDates => " + err);
        }
        else {
            filledDates = deliveryDates.map((record) => record.deliveryDate);
        }

        const inputErrorsFound = orderValid(order, filledDates);

        if (!inputErrorsFound) {
            bl.addOrder(order, function(err, response) {
                if (err) {
                    callback("called by orderController.addOrder => " + err, null, null);
                }
                else {
                    callback(null, response, null);
                }
            });
        }
        else { //errors in input data from client - client bypassed client side validations
            callback(null, null, inputErrorsFound); 
        }
    });
}

module.exports.getDeliveryDates = getDeliveryDates;
module.exports.addOrder = addOrder;
