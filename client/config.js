shoppingApp.constant('configSettings', {
    'shoppingApi': 'http://localhost:8085',
    'productImagePath': 'image_for_product_id_' 
 }); 


 shoppingApp.config(function($routeProvider) {
    $routeProvider
        .when('/entry', {
            templateUrl: 'entry.html'
        })
        .when('/signUp', {
            templateUrl: 'signUp/signUp.html'  
        })
        // .when('/signUpPage1', {
        //     templateUrl: 'signUp/step1.html'  
        // })
        // .when('/signUpPage2', {
        //     templateUrl: 'signUp/step2.html'
        // })
        .when('/products', {
            templateUrl: 'products/products.html'
        })
        .when('/shop', {
            templateUrl: 'shopping-cart/shoppingCart.html'
        })
});
