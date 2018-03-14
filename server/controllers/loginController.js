const bl = require("../bl/loginBL");
const model = require("../models/loginModel");
const logError = require("../share/errorLogging.js");

function login(req, callback) {

    // if (!req.query.loginInfo.email || !req.query.loginInfo.password) {
    //         callback(null, null, "login data missing");
    // }

    var loginDetails;

    try {
            console.log("++++  req.query.loginInfo: " + req.query.loginInfo);
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
