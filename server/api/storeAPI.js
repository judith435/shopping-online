const storeCtrl = require('../controllers/storeController');
const sr = require('../share/serverResponse.js');
const logError = require('../share/errorLogging.js');

function getStatistics(req, res) {
    storeCtrl.getStatistics(function(err, statistics) {
        if (err) { 
            logError.writeToErrorLog('called by storeAPI.getStatistics => ' + err);
            var response =  new sr.ServerResponse('error', err);
        }
        else {
            var response =  new sr.ServerResponse('ok', statistics);
        }
        res.end(JSON.stringify(response));
    })
}

module.exports.getStatistics = getStatistics;