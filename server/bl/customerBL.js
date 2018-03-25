const dal = require("..//dal/dal");
const parmObject = require("..//dal/SPparm");

function getDuplicateCustomer(teudatZehut, email, callback) {

    const spParms = []; 
    spParms.push(new parmObject.SPparm(teudatZehut, false));

    email = email.replace("'", "\\'");
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
    spParms.push(new parmObject.SPparm(customer.teudatZehut, false));

    let firstName = customer.firstName.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(firstName, true));

    let lastName = customer.lastName.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(lastName, true));

    let email = customer.email.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(email, true));
    
    let password = customer.password.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(password, true));

    let street = customer.street.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(street, true));
    
    let city = customer.city.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(city, true));

    let role = customer.role.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(role, true));

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