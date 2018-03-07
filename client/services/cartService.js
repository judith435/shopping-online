shoppingApp.service("cartService", function($http) {

    function error(response) {
        alert("Sorry Error occured in $http: " + JSON.stringify(response));
    }

    this.getLastCart = function(configSettings, tz, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cart",
            method: "GET",
            params: { teudatZehut: tz }
        }).then(success, error);
    };

    this.addCart = function(configSettings, tz, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cart",
            method: "POST",
            params: { teudatZehut: tz }
        }).then(success, error);
    };

    this.getCartItems = function(configSettings, cID, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cartItem",
            method: "GET",
            params: { cartID: cID }
        }).then(success, error);
    };

    this.addCartItem = function(configSettings, cItem, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cartItem",
            method: "POST",
            params: { cartItem: cItem }
        }).then(success, error);
    };

    this.deleteCartItem = function(configSettings, cItemID, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cartItem",
            method: "DELETE",
            params: { cartItemID: cItemID }
        }).then(success, error);
    };

    this.clearCart = function(configSettings, cID, success, error) {
        $http({
            url: configSettings.shoppingApi + "/cartItem/all",
            method: "DELETE",
            params: { cartID: cID }
        }).then(success, error);
    };
});
