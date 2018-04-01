const sr = require("../share/serverResponse.js");
const logError = require("../share/errorLogging.js");
const customerCtrl = require("../controllers/customerController");

var response;

function getDuplicateCustomer(req, res) {

    customerCtrl.getDuplicateCustomer(req.query.id, //id contains the teudatZehut
                                      req.query.email,
                                      function(err, duplicateCustomerFound) {
        if (err) {
          logError.writeToErrorLog("called by customerAPI.getDuplicateCustomer => " + err);
          response =  new sr.ServerResponse("error", err);
        }
        else {
               response =  new sr.ServerResponse("ok", duplicateCustomerFound);
        }
        res.end(JSON.stringify(response));
    });
}

function addCustomer(req, res) {
                                            
    customerCtrl.addCustomer(req, function(err, customerInfo, invalidInputDetails) {
        if (err) {
          logError.writeToErrorLog("called by customerAPI.addCustomer => " + err);
          response =  new sr.ServerResponse("error", err);
        }
        else {
            if(customerInfo) { //insert customer successfull - customer info (minus password) sent back to clieaclient as login info
                let sess;
                sess = req.session;
                sess["customerInfo"] = customerInfo;
                response =  new sr.ServerResponse("ok", customerInfo);
            }
            else { //invalidInputDetails
                response =  new sr.ServerResponse("invalid input", "invalid input =>  following errors were found: \n" + invalidInputDetails); 
            }
        }
        res.end(JSON.stringify(response));
    });
}

module.exports.getDuplicateCustomer = getDuplicateCustomer;
module.exports.addCustomer = addCustomer;