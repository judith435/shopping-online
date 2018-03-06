shoppingApp.service("loginService", function($http) {

    this.checkUserLoggedIn = function (configSettings, success) { 
        $http.get(configSettings.shoppingApi +"/login",{}).then(success, error);
    }

    this.login = function(configSettings, loginInfo, success, error) {
        $http({
            url: configSettings.shoppingApi + "/login",
            method: "POST",
            params: { loginInfo: loginInfo }
        }).then(success, error);
    }

    this.logout = function(configSettings,  success, error) {
        $http({
            url: configSettings.shoppingApi + "/login",
            method: "DELETE" 
        }).then(success, error);
    }

    function error(response) {
        alert("Sorry Error occured in $http: " + JSON.stringify(response));
    }

});
