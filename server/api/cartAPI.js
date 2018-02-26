const sr = require('../share/serverResponse.js');
const logError = require('../share/errorLogging.js');
const cartCtrl = require('../controllers/cartController');

function getLastCart(req, res) {
    cartCtrl.getLastCart(req.query.teudat_zehut, function(err, lastCart) {
        if (err) { 
            logError.writeToErrorLog('called by cartAPI.getLastCart => ' + err);
            var response =  new sr.ServerResponse('error', err);
        }
        else {
            var response =  new sr.ServerResponse('ok', lastCart);
        }
        res.end(JSON.stringify(response));
    })
}


function addCart(req, res) {
                                            
    cartCtrl.addCart(req.query.teudat_zehut, function(err, cartID) {
        if (err) {
          logError.writeToErrorLog('called by cartAPI.addCart => ' + err);
          var response =  new sr.ServerResponse('error', err);
        }
        else {
            var response =  new sr.ServerResponse('ok', cartID);
        }
        res.end(JSON.stringify(response));
    })
}

module.exports.getLastCart = getLastCart;
module.exports.addCart = addCart;
