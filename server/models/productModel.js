// the value 'value-from-client-is-undefined' is set by product service of input field has value undefined to indicate that field was actually undefined
//and did not happen to contain the string undefined

function Product(product) {
    this.id = product['id'];
    this.name = product['name'] === 'value-from-client-is-undefined' ? undefined : product['name'].trim();
    this.category = product['category'] === 'value-from-client-is-undefined' ? undefined : product['category'];
    this.price = product['price'] === 'value-from-client-is-undefined' ? undefined : product['price'];
}

module.exports.Product = Product;
