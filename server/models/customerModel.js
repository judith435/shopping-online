function Customer(customer) {
    this.teudatZehut = customer["teudatZehut"];
    this.firstName = customer["firstName"];
    this.lastName = customer["lastName"];
    this.email = customer["email"];
    //password empty if customer info retrieved for login/ password present on signup of new customer 
    this.password = customer["password"] ?  customer["password"].trim() : "***************";
    this.street = customer["street"];
    this.city = customer["city"];
    this.role = customer["role"];
}

module.exports.Customer = Customer;