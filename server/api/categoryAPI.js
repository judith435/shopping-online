const categoryCtrl = require("../controllers/categoryController");
const sr = require("../share/serverResponse.js");
const logError = require("../share/errorLogging.js");

function getCategories(req, res) {
    categoryCtrl.getCategories(function(err, categories) {
        if (err) { 
            logError.writeToErrorLog("called by categoryAPI.getCategories => " + err);
            var response =  new sr.ServerResponse("error", err);
        }
        else {
            var response =  new sr.ServerResponse("ok", categories);
        }
        res.end(JSON.stringify(response));
    })
}

module.exports.getCategories = getCategories;