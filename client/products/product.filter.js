shoppingApp.filter("selectCategory", function($filter) {

    return function(allProducts, category, productSearch) {
        productSearch = false;
        if (!allProducts) { return; }
        var filteredProducts = [];
        for (let i = 0; i < allProducts.length; i++) { 
            if (allProducts[i].category === category) {
                filteredProducts.push(allProducts[i]);
            }
        }
        productSearch = false;
        return filteredProducts;
    };
});