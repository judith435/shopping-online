function inputEmpty(input) {
    if (!input) { //no value sent from client - field undefined or empty => ''
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

function fileTooLarge(file) {
    return file.data.length > 5000000; 
}   

function fileExtensionInvalid(file) {
    var extension = file.name.split(".").pop().toLowerCase();
    return extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png' && extension !== 'gif'; 
}  

module.exports.inputEmpty = inputEmpty;
module.exports.inputValidAmount = inputValidAmount;
module.exports.fileTooLarge = fileTooLarge;
module.exports.fileExtensionInvalid = fileExtensionInvalid;

