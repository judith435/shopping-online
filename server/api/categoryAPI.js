const categoryCtrl = require('../controllers/categoryController');
const sr = require('../share/serverResponse.js');
const logError = require('../share/errorLogging.js');

function getCategoryDDL(req, res) {
    categoryCtrl.getCategoryDDL(function(err, categories) {
        if (err) { 
            logError.writeToErrorLog('called by categoryAPI.getCategoryDDL => ' + err);
            var response =  new sr.ServerResponse('error', err);
        }
        else {
            var response =  new sr.ServerResponse('ok', categories);
        }
        res.end(JSON.stringify(response));
    })
}



module.exports.getCategoryDDL = getCategoryDDL;
