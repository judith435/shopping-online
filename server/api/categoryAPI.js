var categoryCtrl = require('../controllers/categoryController');

function getCategoryDDL(req, res) {
    categoryCtrl.getCategoryDDL(function(err, categories) {
        if (err) {
            res.end('Sorry Dude! '+ err);
        }
        res.end(JSON.stringify(categories));
    })
}

module.exports.getCategoryDDL = getCategoryDDL;