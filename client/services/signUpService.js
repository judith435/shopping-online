shoppingApp.service("signUpService", function($http) {

    function error(response) {
        alert("Sorry Error occured in productService: " + JSON.stringify(response));
    }

    this.checkDuplicateCustomer = function (configSettings, customer, success) { 
        $http.get(configSettings.shoppingApi + "/customer/duplicate", {
            params: {
                product: product 
            }
        }).then(success, error);
    };

    this.addCustomer = function(configSettings, customer, success, error) {
        $http({
            url: configSettings.shoppingApi + "/customer",
            method: "POST",
            params: { customer: customer }
        }).then(success, error);
    }
});

