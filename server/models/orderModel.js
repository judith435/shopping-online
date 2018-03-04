function Order(order) {
    this.customer = order['customer'];
    this.shoppingCart = order['shoppingCart'];
    this.price = order['price'];
    this.deliveryCity = order['deliveryCity'];
    this.deliveryStreet = order['deliveryStreet'];
    this.deliveryDate = order['deliveryDate'];
    this.ccInfo = order['ccInfo'];
}

module.exports.Order = Order;