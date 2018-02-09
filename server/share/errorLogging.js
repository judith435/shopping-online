const fs = require('fs');

function writeToErrorLog(error) {

    let errorText = 'following error occured at ' + new Date() + ' : ' +  error;

    fs.writeFile('errorLog.txt', errorText, (err) => {  
        if (err) {
            throw err;
        }
    });
  }
  
  module.exports.writeToErrorLog = writeToErrorLog;
  