const mysql = require('mysql');

function executeQuery(dbname, spName, spParms, callback) {
    console.log('@@@ in dal =>  spName: ' + spName + ' spParms: ' + JSON.stringify(spParms));

    var parms = '';
    if (spParms === '') {
        parms = '()';
    }
    else {
            let parmTemp = '';
            spParms.forEach(function (parm, i) {
                parmTemp = parm.isString ? '"' + parm.value + '"' : parm.value;
                parms += parmTemp;
                parms += i < spParms.length - 1 ? ',' : ''; //put comma after each parameter except for last one
                console.log('*** in loop parms=' + parms)
            });
            parms = '(' + parms + ')'
            console.log('### at end of loop parms=' + parms)
    }

    const con = mysql.createConnection(
        // connection details
        {
            host: 'localhost',
            user: 'root',
            password: '',
            database: dbname
        }
    );

    con.connect(function (err) {
        if (err) {
            console.log('Error connecting to DB:' + err);
            return;
        }
    });

    con.query('Call ' + spName + parms, function (err, rows) {
        if (err) {
            console.log('>>> dal error calling stored procedurs' + err);
            callback(err);
        } 
        else {
            callback(null, rows)
        }
    });
    con.end();
}

module.exports.executeQuery = executeQuery;