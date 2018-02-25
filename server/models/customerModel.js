function Customer(customer) {
    this.teudatZehut = customer['teudatZehut'];
    this.firstName = customer['firstName'].trim();
    this.lastName = customer['lastName'].trim();
    this.email = customer['email'].trim();
    //password empty if customer info retrieved for login/ password present on signup of new customer 
    this.password = customer['password'] ?  customer['password'].trim() : '***************';
    this.street = customer['street'].trim();
    this.city = customer['city'].trim();
    this.role = customer['role'].trim();
}

module.exports.Customer = Customer;