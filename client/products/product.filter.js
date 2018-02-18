shoppingApp.filter("selectCategory", function($filter) {

    return function(allProducts, category) {
        if (!allProducts) {return;}
        var filteredProducts = [];
        for (let i = 0; i < allProducts.length; i++) { 
            if (allProducts[i].category === category) {
                filteredProducts.push(allProducts[i]);
            }
        }
        return filteredProducts;
        // return $filter('filter')(allProducts,{$ : category}); 
    }


});
