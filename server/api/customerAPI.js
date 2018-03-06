const sr = require("../share/serverResponse.js");
const logError = require("../share/errorLogging.js");
const customerCtrl = require("../controllers/customerController");

var response;

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
                response =  new sr.ServerResponse("invalid input", "invalid input =>  following erors were found: \n" + invalidInputDetails); 
            }
        }
        res.end(JSON.stringify(response));
    })
}

module.exports.addCustomer = addCustomer;
