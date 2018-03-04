shoppingApp.service('orderService', function($http) {
    
    this.addOrder = function(configSettings, order, success, error) {
        $http({
            url: configSettings.shoppingApi + '/order',
            method: 'POST',
            params: { order: order }
        }).then(success, error);
    }


    function error(response) {
        alert("Sorry Error occured in productService: " + JSON.stringify(response));
    }
});

