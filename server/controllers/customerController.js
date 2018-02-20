const bl = require('../bl/customerBL');
const model = require('../models/customerModel');
const validations = require('../share/validations');


function addCustomer(req, callback) {

    const customer = new model.Customer(JSON.parse(req.query.customer));
    const inputErrorsFound = customerValid(customer);

    if (!inputErrorsFound) {
        bl.addCustomer(customer, function(err, response) {
            if (err) {
                callback('called by productController.addUpdateProduct => ' + err, null, null);
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

function customerValid(customer) {
    let errorsFound = '';

    errorsFound  = validations.inputEmpty(customer.firstName) ?  'First Name required \n' : '';
    errorsFound += validations.inputEmpty(customer.city) ? 'city required \n' : '';

    return errorsFound;
}

module.exports.addCustomer = addCustomer;
