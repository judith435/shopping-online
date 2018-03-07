const bl = require("../bl/loginBL");
const model = require("../models/loginModel");

function login(req, callback) {
    
    const loginDetails = new model.Login(JSON.parse(req.query.loginInfo));

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
