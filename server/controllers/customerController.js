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
                 //send back customer info to be used as login info when new customer clicks start shoppin
                 //must 'star out' password first -> this can NEVER be sent back to client
                customer.password = '***************';
                callback(null, customer, null);
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