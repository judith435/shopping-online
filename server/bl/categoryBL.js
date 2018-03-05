var dal = require('../dal/dal');

function getCategories(callback) {
    dal.executeQuery('shopping', 'get_categories', '' ,function(err, rows) {
        if (err) {
            callback('called by categoryBL.getCategories => ' + err);
        }
        callback(null, rows);
    });
}

module.exports.getCategories = getCategories;
