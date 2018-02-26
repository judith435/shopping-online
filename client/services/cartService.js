shoppingApp.service('cartService', function($http) {

    this.getLastCart = function(configSettings, teudat_zehut, success, error) {
        $http({
            url: configSettings.shoppingApi + '/cart',
            method: 'GET',
            params: { teudat_zehut: teudat_zehut }
        }).then(success, error);
    }

    this.addCart = function(configSettings, teudat_zehut, success, error) {
        $http({
            url: configSettings.shoppingApi + '/cart',
            method: 'POST',
            params: { teudat_zehut: teudat_zehut }
        }).then(success, error);
    }

    function error(response) {
        alert("Sorry Error occured in $http: " + JSON.stringify(response));
    }

});
