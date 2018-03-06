const categoryCtrl = require("../controllers/categoryController");
const sr = require("../share/serverResponse.js");
const logError = require("../share/errorLogging.js");

var response;

function getCategories(req, res) {
    categoryCtrl.getCategories(function(err, categories) {
        if (err) { 
            logError.writeToErrorLog("called by categoryAPI.getCategories => " + err);
            response =  new sr.ServerResponse("error", err);
        }
        else {
            response =  new sr.ServerResponse("ok", categories);
        }
        res.end(JSON.stringify(response));
    })
}

module.exports.getCategories = getCategories;