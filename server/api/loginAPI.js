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
      
    loginCtrl.login(req, function(err, customerInfo) {
        if (err) {
          logError.writeToErrorLog('called by loginAPI.login => ' + err);
          var response =  new sr.ServerResponse('error', err);
        }
        else {
            let sess;
            sess = req.session;
            sess['customerInfo'] = customerInfo;
            var response =  new sr.ServerResponse('ok', sess);
        }
        res.end(JSON.stringify(response));
    })
  
    // let sess;
    // sess = req.session;
    // sess['userInfo'] = JSON.stringify(req.query);
    // console.log('*********** session' + sess['userInfo'] );

    // var response =  new sr.ServerResponse('ok', sess);
    // res.end(JSON.stringify(response));
}


module.exports.checkUserLoggedIn = checkUserLoggedIn;
module.exports.login = login;
