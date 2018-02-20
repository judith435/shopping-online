const dal = require('..//dal/dal');
const parmObject = require('..//dal/spParm');

function addCustomer(customer, callback) {
    //req.body
    const spParms = []; 
    spParms.push(new parmObject.spParm(loginDetails.email, true));
    spParms.push(new parmObject.spParm(loginDetails.passWord, true));

    dal.executeQuery('shopping', 'get_customer_info', spParms, function(err, rows) {
        if (err) {
            callback('called by customerBL.addCustomer => ' + err, null, null);
            return;
        }
        callback(null, 'insert successful', null);
    });
}

module.exports.login = login;
 