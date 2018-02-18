shoppingApp.filter("selectCategory", function($filter) {

    return function(allProducts, category) {

        return $filter('filter')(allProducts,{$ : category}); 
        //let filteredProducts = $filter('filter')(allProducts,{$ : category}); 
       // return filteredProducts;
    }


});
