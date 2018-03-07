shoppingApp.service("loginService", function($http) {

    function error(response) {
        alert("Sorry Error occured in $http: " + JSON.stringify(response));
    }

    this.checkUserLoggedIn = function (configSettings, success) { 
        $http.get(configSettings.shoppingApi +"/login",{}).then(success, error);
    };

    this.login = function(configSettings, loginData, success, error) {
        $http({
            url: configSettings.shoppingApi + "/login",
            method: "POST",
            params: { loginInfo: loginData }
        }).then(success, error);
    };

    this.logout = function(configSettings,  success, error) {
        $http({
            url: configSettings.shoppingApi + "/login",
            method: "DELETE" 
        }).then(success, error);
    };
});
