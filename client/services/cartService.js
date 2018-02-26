shoppingApp.service('cartService', function($http) {

    this.getLastCart = function(configSettings, teudatZehut, success, error) {
        $http({
            url: configSettings.shoppingApi + '/cart',
            method: 'GET',
            params: { teudatZehut: teudatZehut }
        }).then(success, error);
    }

    this.addCart = function(configSettings, teudatZehut, success, error) {
        $http({
            url: configSettings.shoppingApi + '/cart',
            method: 'POST',
            params: { teudatZehut: teudatZehut }
        }).then(success, error);
    }

    this.addCartItem = function(configSettings, cartItem, success, error) {
        $http({
            url: configSettings.shoppingApi + '/cartItem',
            method: 'POST',
            params: { cartItem: cartItem }
        }).then(success, error);
    }

    function error(response) {
        alert("Sorry Error occured in $http: " + JSON.stringify(response));
    }

});
