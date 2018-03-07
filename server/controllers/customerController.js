const bl = require("../bl/customerBL");
const model = require("../models/customerModel");
const validations = require("../share/validations");
const logError = require("../share/errorLogging.js");

function getDuplicateCustomer(teudatZehut, email, callback) {

    bl.getDuplicateCustomer(teudatZehut, email, function(err, duplicateCustomerFound) {
        if (err) {
            callback("called by customerController.getDuplicateCustomer => " + err);
        }
        else {
            callback(null, duplicateCustomerFound);
        }
    });
}

function customerValid(customer, duplicateCustomerFound) {
    let errorsFound = "";

    errorsFound  = !validations.idValid(customer.teudatZehut) ?  "numeric id required \n" : "";
    errorsFound +=  validations.inputEmpty(customer.firstName) ? "first name required \n" : "";
    errorsFound +=  validations.inputEmpty(customer.lastName) ? "last name required \n" : "";
    errorsFound += !validations.emailValid(customer.email) ? "valid email required \n" : "";
    errorsFound +=  validations.inputEmpty(customer.password) ? "password required \n" : "";
    errorsFound +=  validations.inputEmpty(customer.street) ? "street required \n" : "";
    errorsFound +=  validations.inputEmpty(customer.city) ? "city required \n" : "";
    errorsFound +=  duplicateCustomerFound !== 0 ?
            "customer with same id and/or email already exist(s)" : "";
    return errorsFound;
}

function addCustomer(req, callback) {

    const customer = new model.Customer(JSON.parse(req.query.customer));

    getDuplicateCustomer(!customer.teudatZehut ? 0 : customer.teudatZehut, 
                         !customer.email  ? "" : customer.email,
       function(err, result) {

        if (err) {
            logError.writeToErrorLog("called by customerController.getDuplicateCustomer => " + err);
        }
        const inputErrorsFound = customerValid(customer, result.duplicateCustomerFound);

        if (!inputErrorsFound) {
            bl.addCustomer(customer, function(err, response) {
                if (err) {
                    callback("called by customerController.addCustomer => " + err, null, null);
                }
                else {
                    //send back customer info to be used as login info when new customer clicks start shoppin
                    //must "star out" password first -> this can NEVER be sent back to client
                    customer.password = "***************";
                    callback(null, customer, null);
                }
            });
        }
        else {
            callback(null, null, inputErrorsFound); 
        }
    });
}

module.exports.getDuplicateCustomer = getDuplicateCustomer;
module.exports.addCustomer = addCustomer;