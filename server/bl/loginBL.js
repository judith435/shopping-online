//all string mysql string parameters (parmObject.SPparm("parm name", true)) have any ' escaped
//reason mysql fails if string contains unescaped apostrophe

const dal = require("..//dal/dal");
const parmObject = require("..//dal/SPparm");
const model = require("../models/customerModel");

function login(loginDetails, callback) {
    const spParms = [];

    let email = loginDetails.email.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(email, true));
    let passWord = loginDetails.passWord.replace("'", "\\'");
    spParms.push(new parmObject.SPparm(passWord, true));

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
 