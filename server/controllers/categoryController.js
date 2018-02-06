var bl = require('../bl/categoryBL');

function getCategoryDDL(callback) {

    bl.category.getCategoryDDL(function(err, categoryArray) {
        if (err) {
            callback(err);
        }
        callback(null, categoryArray);
    })
}

module.exports.getCategoryDDL = getCategoryDDL;