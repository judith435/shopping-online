const bl = require("../bl/loginBL");
const model = require("../models/loginModel");
const logError = require("../share/errorLogging.js");

function login(req, callback) {


    //login data empty - user bypassed client side validations => return message that customer not found
    if (!req.query.loginInfo.hasOwnProperty("email") || !req.query.loginInfo.hasOwnProperty("email")) {
        callback(null, null, "login data missing ");
    }

    var loginDetails;
    try {
            loginDetails = new model.Login(JSON.parse(req.query.loginInfo));

    } catch(err) {
        callback("called by loginController.login: JSON.parse(req.query.loginInfo) error  => " + err, null, null);
    }

    bl.login(loginDetails, function(err, customerInfo, noSuchCustomer) {
        if (err) {
          callback("called by loginController.login => " + err, null, null);
        }
        else {
            if (customerInfo) {
                callback(null, customerInfo, null);
            }
            else {
                callback(null, null, noSuchCustomer);
            }
        }
    });
}

module.exports.login = login;
