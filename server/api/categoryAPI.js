const categoryCtrl = require('../controllers/categoryController');

function getCategoryDDL(req, res) {
    categoryCtrl.getCategoryDDL(function(err, categories) {
        if (err) {
            res.end('error occured'+ err);
        }
        res.end(JSON.stringify(categories));
    })
}

module.exports.getCategoryDDL = getCategoryDDL;