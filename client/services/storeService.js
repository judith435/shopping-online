shoppingApp.service("storeService", function($http) {
    function error(response) {
        alert("Sorry Error occured in $http: " + JSON.stringify(response));
    }

    this.getStoreStatistics = function (configSettings, success) { 
        $http.get(configSettings.shoppingApi +"/store",{}).then(success, error);
    };
});
