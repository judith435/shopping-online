shoppingApp.service('catgoryService', function($http) {
    
    this.getCatgories = function (configSettings, success) { 
        $http.get(configSettings.shoppingApi +'/category/ddl',{}).then(success, error);
    }

    function error(response) {
        alert("Sorry Error occured in $http: " + JSON.stringify(response));
    }
});
