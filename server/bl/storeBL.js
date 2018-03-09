var dal = require("../dal/dal");
const model = require("../models/storeStatisticsModel");

function getStatistics(callback) {
    dal.executeQuery("shopping", "get_store_statistics", "", function(err, rows) {
        if (err) {
            callback("called by storeBL.getStatistics => " + err);
        }
        if(rows) {
            let statistics = new model.StoreStatistics(rows[0][0]); 
            callback(null, statistics);
        }
        callback("unable to retrive statistics - please contact support center", null);

    });
}

module.exports.getStatistics = getStatistics;