shoppingApp.service("categoryService", function($http) {
    
    function error(response) {
        alert("Sorry Error occured in categoryService: " + JSON.stringify(response));
    }

    this.getCategories = function (configSettings, success) { 
        $http.get(configSettings.shoppingApi +"/category",{}).then(success, error);
    };
});