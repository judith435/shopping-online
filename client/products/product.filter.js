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


shoppingApp.filter("productSearch", function($filter) {

    return function(allProducts, productSearchParm) {
        if (!allProducts || !productSearchParm ) {return;}
        var foundProducts = [];
        for (let i = 0; i < allProducts.length; i++) { 
            if (allProducts[i].name.includes(productSearchParm)) { 
                foundProducts.push(allProducts[i]);
            }
        }
        return foundProducts;
    }


});
