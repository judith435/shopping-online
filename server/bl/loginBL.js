const dal = require("..//dal/dal");
const ParmObject = require("..//dal/spParm");
const model = require("../models/customerModel");

function login(loginDetails, callback) {
    //req.body
    const spParms = []; 
    spParms.push(new ParmObject.spParm(loginDetails.email, true));
    spParms.push(new ParmObject.spParm(loginDetails.passWord, true));

    dal.executeQuery("shopping", "get_customer_info", spParms, function(err, rows) {
        if (err) {
            callback("called by loginBL.login => " + err, null, null);
            return;
        }
        if(rows[0][0]) { //customer found with login details given
            let customerInfo = new model.Customer(rows[0][0]); 
            callback(null, customerInfo, null);
        }
        callback(null, null, "no customer found with login details found");
    });
}

module.exports.login = login;
 