shoppingApp.service("orderService", function($http) {

    function error(response) {
        alert("Sorry Error occured in productService: " + JSON.stringify(response));
    }

    this.getDeliveryDates = function(configSettings, success, error) {
        $http({
            url: configSettings.shoppingApi + "/order",
            method: "GET",
        }).then(success, error);
    };

    this.addOrder = function(configSettings, orderSubmitted, success, error) {
        $http({
            url: configSettings.shoppingApi + "/order",
            method: "POST",
            params: { order: orderSubmitted }
        }).then(success, error);
    };
});

