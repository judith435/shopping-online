const bl = require('../bl/categoryBL');

function getCategoryDDL(callback) {

    bl.category.getCategoryDDL(function(err, categoryArray) {
        if (err) {
            callback('called by categoryController.getCategoryDDL => ' + err);
        }
        callback(null, categoryArray);
    })
}

module.exports.getCategoryDDL = getCategoryDDL;