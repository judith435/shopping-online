const bl = require("../bl/categoryBL");

function getCategories(callback) {

    bl.getCategories(function(err, categoryArray) {
        if (err) {
            callback("called by categoryController.getCategories => " + err);
        }
        callback(null, categoryArray);
    })
}

module.exports.getCategories = getCategories;