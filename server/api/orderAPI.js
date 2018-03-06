const sr = require("../share/serverResponse.js");
const logError = require("../share/errorLogging.js");
const orderCtrl = require("../controllers/orderController");

function getDeliveryDates(req, res) {

    orderCtrl.getDeliveryDates(function(err, deliveryDates) {
        if (err) {
          logError.writeToErrorLog("called by orderAPI.getDeliveryDates => " + err);
          var response =  new sr.ServerResponse("error", err);
        }
        else {
                var response =  new sr.ServerResponse("ok", deliveryDates);
        }
        res.end(JSON.stringify(response));
    })
}

function addOrder(req, res) {
                                            
    orderCtrl.addOrder(req, function(err, response, invalidInputDetails) {
        if (err) {
          logError.writeToErrorLog("called by orderAPI.addOrder => " + err);
          var response =  new sr.ServerResponse("error", err);
        }
        else {
            if(response) { //insert order successfull - new order id
                var response =  new sr.ServerResponse("ok", response);
            }
            else { //invalidInputDetails
                var response =  new sr.ServerResponse("invalid input", "invalid input =>  following erors were found: \n" + invalidInputDetails); 
            }
        }
        res.end(JSON.stringify(response));
    })
}

module.exports.getDeliveryDates = getDeliveryDates;
module.exports.addOrder = addOrder;
