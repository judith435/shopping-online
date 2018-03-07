const dal = require("..//dal/dal");
const parmObject = require("..//dal/SPparm");

function getDuplicateCustomer(teudatZehut, email, callback) {

    const spParms = []; 
    spParms.push(new parmObject.SPparm(teudatZehut, false));
    spParms.push(new parmObject.SPparm(email, true));

    dal.executeQuery("shopping", "check_customer_exists", spParms, function(err, rows) {
        if (err) {
            callback("called by customerBL.getDuplicateCustomer => " + err);
        }
        else {
            callback(null, rows[0][0]);
        }
    });
}

function addCustomer(customer, callback) {
    //req.body
    const spParms = []; 
    spParms.push(new parmObject.SPparm(customer.teudatZehut, true));
    spParms.push(new parmObject.SPparm(customer.firstName, true));
    spParms.push(new parmObject.SPparm(customer.lastName, true));
    spParms.push(new parmObject.SPparm(customer.email, true));
    spParms.push(new parmObject.SPparm(customer.password, true));
    spParms.push(new parmObject.SPparm(customer.street, true));
    spParms.push(new parmObject.SPparm(customer.city, true));
    spParms.push(new parmObject.SPparm(customer.role, true));

    dal.executeQuery("shopping", "insert_customer", spParms, function(err, rows) {
        if (err) {
            callback("called by customerBL.addCustomer => " + err, null, null);
            return;
        }
        callback(null, "customer added successfully", null);
    });
}

module.exports.getDuplicateCustomer = getDuplicateCustomer;
module.exports.addCustomer = addCustomer;