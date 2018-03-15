shoppingApp.constant("configSettings", {
    "shoppingApi": "http://localhost:8085",
    "productImagePath": "image_for_product_id_", 
    "citiesList": ["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","San Jose"]
 }); 


 shoppingApp.config(function($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "home/home.html"
        })
        .when("/signUp", {
            templateUrl: "signUp/signUp.html"  
        })
        .when("/products", {
            templateUrl: "products/products.html"
        })
        .when("/shop", {
            templateUrl: "shopping-cart/shopping.html"
        })
        .when("/order", {
            templateUrl: "order/order.html"
        })
        .otherwise({ redirectTo: "home" });
});