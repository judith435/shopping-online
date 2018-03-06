shoppingApp.service("storeService", function($http) {
    
    this.getStoreStatistics = function (configSettings, success) { 
        $http.get(configSettings.shoppingApi +"/store",{}).then(success, error);
    }

    function error(response) {
        alert("Sorry Error occured in $http: " + JSON.stringify(response));
    }
});
