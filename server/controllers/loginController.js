const bl = require('../bl/loginBL');
const model = require('../models/loginModel');

function login(req, callback) {
    
    const loginDetails = new model.Login(JSON.parse(req.query.loginInfo));

    bl.login(loginDetails, function(err, customerInfo) {
        if (err) {
          callback('called by loginController.login => ' + err);
        }
        else {
            callback(null, customerInfo);
        }
    })
}

module.exports.login = login;
