var dal = require('../dal/dal');

function getCategoryDDL(callback) {
    dal.executeQuery('shopping', 'get_categories_for_ddl', '' ,function(err, rows) {
        if (err) {
            callback(err);
        }
        callback(null, rows);
    });
}

module.exports.category = {
    getCategoryDDL: getCategoryDDL

}