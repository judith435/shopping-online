shoppingApp.service("cartService", function($http) {

    function error(response) {
        alert("Sorry Error occured in $http: " + JSON.stringify(response));
    }

    this.getLastCart = function(configSettings, teudatZehut, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cart",
            method: "GET",
            params: { teudatZehut: teudatZehut }
        }).then(success, error);
    };

    this.addCart = function(configSettings, teudatZehut, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cart",
            method: "POST",
            params: { teudatZehut: teudatZehut }
        }).then(success, error);
    };

    this.getCartItems = function(configSettings, cartID, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cartItem",
            method: "GET",
            params: { cartID: cartID }
        }).then(success, error);
    }


    this.addCartItem = function(configSettings, cartItem, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cartItem",
            method: "POST",
            params: { cartItem: cartItem }
        }).then(success, error);
    }

    this.deleteCartItem = function(configSettings, cartItemID, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cartItem",
            method: "DELETE",
            params: { cartItemID: cartItemID }
        }).then(success, error);
    }

    this.clearCart = function(configSettings, cartID, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cartItem/all",
            method: "DELETE",
            params: { cartID: cartID }
        }).then(success, error);
    }
});
