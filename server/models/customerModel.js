function Customer(customer) {
    this.teudatZehut = customer['teudatZehut'];
    this.firstName = customer['firstName'].trim();
    this.lastName = customer['lastName'].trim();
    this.email = customer['email'].trim();
    this.password = customer['password'] ?  customer['password'].trim() : '***************';
    this.street = customer['street'].trim();
    this.city = customer['city'].trim();
    this.role = customer['role'].trim();
}

module.exports.Customer = Customer;