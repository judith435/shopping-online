const categoryCtrl = require('../controllers/categoryController');
const sr = require('../share/serverResponse.js');

function getCategoryDDL(req, res) {
    categoryCtrl.getCategoryDDL(function(err, categories) {
        if (err) { 
            var response =  new sr.ServerResponse('error occured', err);
        }
        else {
            var response =  new sr.ServerResponse('ok', categories);
        }
        res.end(JSON.stringify(response));
    })
}



module.exports.getCategoryDDL = getCategoryDDL;
