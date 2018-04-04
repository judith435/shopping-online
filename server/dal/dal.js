const mysql = require("mysql");
const logError = require("../share/errorLogging.js");

function executeQuery(dbname, spName, spParms, callback) {
    var parms = "";
    if (spParms === "") {
        parms = "()";
    }
    else {
            let parmTemp = "";
            spParms.forEach(function (parm, i) {
                parmTemp = parm.isString ? "'" + parm.value + "'" : parm.value;
                parms += parmTemp;
                parms += i < spParms.length - 1 ? "," : ""; //put comma after each parameter except for last one
            });
            parms = "(" + parms + ")";
            // console.log("### at end of loop parms=" + parms);
    }

    const con = mysql.createConnection(
        // connection details
        {
            host: "localhost",
            user: "root",
            password: "",
            database: dbname
        }
    );

    con.connect(function (err) {
        if (err) {
            logError.writeToErrorLog(err);
            callback(err.code);
        }
    });

    con.query("Call " + spName + parms, function (err, rows) {
        if (err) {
            callback("error in dal => " + err);
        } 
        else {
            callback(null, rows);
        }
    });
    con.end();
}

module.exports.executeQuery = executeQuery;