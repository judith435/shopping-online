const dal = require('..//dal/dal');
const parmObject = require('..//dal/spParm');

function addCustomer(customer, callback) {
    //req.body
    const spParms = []; 
    spParms.push(new parmObject.spParm(customer.teudatZehut, true));
    spParms.push(new parmObject.spParm(customer.firstName, true));
    spParms.push(new parmObject.spParm(customer.lastName, true));
    spParms.push(new parmObject.spParm(customer.email, true));
    spParms.push(new parmObject.spParm(customer.password, true));
    spParms.push(new parmObject.spParm(customer.street, true));
    spParms.push(new parmObject.spParm(customer.city, true));
    spParms.push(new parmObject.spParm(customer.role, true));

    dal.executeQuery('shopping', 'insert_customer', spParms, function(err, rows) {
        if (err) {
            callback('called by customerBL.addCustomer => ' + err, null, null);
            return;
        }
        callback(null, 'customer added successfully', null);
    });
}

module.exports.addCustomer = addCustomer;