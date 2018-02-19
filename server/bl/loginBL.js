const dal = require('..//dal/dal');
const parmObject = require('..//dal/spParm');
const model = require('../models/customerModel');

function login(loginDetails, callback) {
    //req.body
    const spParms = []; 
    spParms.push(new parmObject.spParm(loginDetails.email, true));
    spParms.push(new parmObject.spParm(loginDetails.passWord, true));

    dal.executeQuery('shopping', 'get_customer_info', spParms, function(err, rows) {
        if (err) {
            callback('called by loginBL.login => ' + err);
        }
        else {
            //const customerInfo = {}; //rows[0][0].street
            const customerInfo = new model.Customer(rows[0][0]);
            callback(null, customerInfo);
        }
    });
}

module.exports.login = login;
 