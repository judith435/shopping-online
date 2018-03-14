function Login(login) {
    this.email = login["email"].trim();
    this.passWord = login["password"].trim();

}

module.exports.Login = Login;