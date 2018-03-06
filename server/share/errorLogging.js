const fs = require("fs");

function writeToErrorLog(error) {

    let errorText = "following error occured at " + new Date() + " : " +  JSON.stringify(error);

    fs.appendFile("errorLog.txt", "\r\n" + errorText, (err) => {  
        if (err) {
            console.log("||||||||||| writing to error log failed: " + err);
            throw err;
        }
    });
  }
  
  module.exports.writeToErrorLog = writeToErrorLog;
  