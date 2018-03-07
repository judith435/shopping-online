const bl = require("../bl/storeBL");

function getStatistics(callback) {

    bl.getStatistics(function(err, statistics) {
        if (err) {
            callback("called by storeController.getStatistics => " + err);
        }
        callback(null, statistics);
    });
}

module.exports.getStatistics = getStatistics;