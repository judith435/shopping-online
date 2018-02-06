var bl = require('../bl/catgoryBL');

function getCategoryDDL(callback) {

    bl.catgory.getCategoryDDL(function(err, catgoryArray) {
        if (err) {
            callback(err);
        }
        callback(null, catgoryArray);
    })
}

module.exports.getCategoryDDL = getCategoryDDL;