function Customer(customer) {
    this.teudat_zehut = customer['teudat_zehut'];
    this.first_name = customer['first_name'];
    this.e_mail = customer['e_mail'];
    this.street = customer['street'];
    this.city = customer['city'];
    this.role = customer['role'];
}

module.exports.Customer = Customer;