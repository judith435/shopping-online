shoppingApp.service("signUpService", function($http) {

    function error(response) {
        alert("Sorry Error occured in signUpService: " + JSON.stringify(response));
    }

    this.checkDuplicateCustomer = function (configSettings, customerID, customerEmail, success) { 
        $http.get(configSettings.shoppingApi + "/customer/duplicate", {
            params: {
                id: customerID,
                email: customerEmail 
            }
        }).then(success, error);
    };

    this.addCustomer = function(configSettings, newCustomer, success, error) {
        $http({
            url: configSettings.shoppingApi + "/customer",
            method: "POST",
            params: { customer: newCustomer }
        }).then(success, error);
    };
});

