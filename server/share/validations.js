function inputNotEmpty(input) {
    if (!input) { //no value sent from client - field undefined
        return false;
    }
    return input.trim(); //field has value => check it contains value besides empty spaces
}   

module.exports.inputNotEmpty = inputNotEmpty;
