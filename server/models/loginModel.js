function Login(login) {
    this.email = login['userName'].trim();
    this.passWord = login['password'].trim();
}

module.exports.Login = Login;