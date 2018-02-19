function Login(login) {
    this.email = login['userName'];
    this.passWord = login['password'];
}

module.exports.Login = Login;