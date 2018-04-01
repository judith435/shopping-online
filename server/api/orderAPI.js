const sr = require("../share/serverResponse.js");
const logError = require("../share/errorLogging.js");
const orderCtrl = require("../controllers/orderController");

var response;

function getDeliveryDates(req, res) {

    let sess = req.session;
    //user not logged in or customer attempting to access order panel
    console.log("sess[customerInfo]:  " + JSON.stringify(sess["customerInfo"]));
    if (!sess["customerInfo"]) { 
      response =  new sr.ServerResponse("forbiddenAccessAttempted", "");
      res.end(JSON.stringify(response));
      return;
    }
  
    orderCtrl.getDeliveryDates(function(err, deliveryDates) {
        if (err) {
          logError.writeToErrorLog("called by orderAPI.getDeliveryDates => " + err);
          response =  new sr.ServerResponse("error", err);
        }
        else {
               response =  new sr.ServerResponse("ok", deliveryDates);
        }
        res.end(JSON.stringify(response));
    });
}

function addOrder(req, res) {
                                            
    orderCtrl.addOrder(req, function(err, response, invalidInputDetails) {
        if (err) {
          logError.writeToErrorLog("called by orderAPI.addOrder => " + err);
          response =  new sr.ServerResponse("error", err);
        }
        else {
            if(response) { //insert order successfull - new order id
                response =  new sr.ServerResponse("ok", response);
            }
            else { //invalidInputDetails
               response =  new sr.ServerResponse("invalid input", "invalid input =>  following errors were found: \n" + invalidInputDetails); 
            }
        }
        res.end(JSON.stringify(response));
    });
}

module.exports.getDeliveryDates = getDeliveryDates;
module.exports.addOrder = addOrder;
