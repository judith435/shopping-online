const sr = require('../share/serverResponse.js');
const logError = require('../share/errorLogging.js');
const loginCtrl = require('../controllers/loginController');


function checkUserLoggedIn(req, res) {
    let sess;
    sess = req.session;
    var response =  new sr.ServerResponse('ok', sess);
    res.end(JSON.stringify(response));
}

function login(req, res) {
    console.log('login req.query:  ' + req.query);
    console.log('login req.query:  ' + JSON.stringify(req.query));
      
    loginCtrl.login(req, function(err, customerInfo, noSuchCustomer) {
        if (err) {
          logError.writeToErrorLog('called by loginAPI.login => ' + err);
          var response =  new sr.ServerResponse('error', err);
        }
        else {
            if(customerInfo) { //customerInfo successfully found
                let sess;
                sess = req.session;
                sess['customerInfo'] = customerInfo;
                var response =  new sr.ServerResponse('ok', sess);
            }
            else { //noSuchCustomer no customer found with login info given
                var response =  new sr.ServerResponse('noSuchCustomer', '');
            }
        }
        res.end(JSON.stringify(response));
    })
  
    // let sess;
    // sess = req.session;
    // sess['userInfo'] = JSON.stringify(req.query);
    // console.log('*********** session' + sess['userInfo'] );

    // var response =  new sr.ServerResponse('ok', sess);  req.session.destroy();
    // res.end(JSON.stringify(response));
}

function logout(req, res) {

    req.session.destroy();
    var response =  new sr.ServerResponse('ok', '');
    res.send(JSON.stringify(response));
}

module.exports.checkUserLoggedIn = checkUserLoggedIn;
module.exports.login = login;
module.exports.logout = logout;


