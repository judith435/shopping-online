const sr = require('../share/serverResponse.js');
const logError = require('../share/errorLogging.js');


function getLoginInfo(req, res) {
    let sess;
    sess = req.session;
    var response =  new sr.ServerResponse('ok', sess);
    res.end(JSON.stringify(response));
}

function login(req, res) {
    let sess;
    sess = req.session;
    sess['userInfo'] = JSON.stringify(req.query);
    console.log('*********** session' + sess['userInfo'] );

    var response =  new sr.ServerResponse('ok', sess);
    res.end(JSON.stringify(response));
}


module.exports.getLoginInfo = getLoginInfo;
module.exports.login = login;
