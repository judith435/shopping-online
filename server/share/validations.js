function inputEmpty(input) {
    if (!input) { //no value sent from client - field undefined or empty => ""
        return true;
    }
} 

function inputValidAmount(input) {
    let amount = parseFloat(input)
    if (!amount) { //amount is NaN
        return false;
    }
    
    return amount > 0 && amount < 10000;  
} 

function dateValid(date) {
    if (!date) { 
        return false;
    }

    if (isNaN(Date.parse(date))) {
        return false;
    }
    return true;
}

function fileTooLarge(file) {
    return file.data.length > 5000000; 
}   

function fileExtensionInvalid(file) {
    var extension = file.name.split(".").pop().toLowerCase();
    return extension !== "jpg" && extension !== "jpeg" && extension !== "png" && extension !== "gif"; 
}  


//credit card validations start
function validateCC(cc) {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(cc)) {
        return false;
    } 

    // The Luhn Algorithm. It"s so pretty.
    var nCheck = 0; 
    var nDigit = 0; 
    var bEven = false;
    
    cc = cc.replace(/\D/g, "");

    for (var n = cc.length - 1; n >= 0; n--) {
        var cDigit = cc.charAt(n);
        var nDigit = parseInt(cDigit, 10);

        if (bEven) {
            if ((nDigit *= 2) > 9) {
                nDigit -= 9;
            } 
        }

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) === 0;
}

function creditCardValid(cc) {
    if (!cc) { //no value sent from client - field undefined or empty => ""
        return false;
    }
    var ccRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    var ccValid = ccRegex.test(cc);
    if (ccValid) {
        ccValid =  validateCC(cc);
    }
    return ccValid;
}

//credit card validations end


module.exports.inputEmpty = inputEmpty;
module.exports.inputValidAmount = inputValidAmount;
module.exports.dateValid = dateValid;
module.exports.fileTooLarge = fileTooLarge;
module.exports.fileExtensionInvalid = fileExtensionInvalid;
module.exports.creditCardValid = creditCardValid;
