const sr = require('../share/serverResponse.js');
const logError = require('../share/errorLogging.js');
const customerCtrl = require('../controllers/customerController');

function addCustomer(req, res) {
                                            
    customerCtrl.addCustomer(req, function(err, response, invalidInputDetails) {
        if (err) {
          logError.writeToErrorLog('called by customerAPI.addCustomer => ' + err);
          var response =  new sr.ServerResponse('error', err);
        }
        else {
            if(response) { //insert/update successfull
                var response = new sr.ServerResponse('ok', response);
            }
            else { //invalidInputDetails
                var response =  new sr.ServerResponse('invalid input', 'invalid input =>  following erors were found: \n' + invalidInputDetails); 
            }
        }
        res.end(JSON.stringify(response));
    })
}

module.exports.addCustomer = addCustomer;
