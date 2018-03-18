shoppingApp.controller("header", function handleHeader( $scope,
                                                        loginService,
                                                        configSettings,
                                                        $location,
                                                        customerInfo)
{
    $scope.$on("set-header-info", function(event, customer) {
        $scope.customerName = "Hello " + customer.firstName + " " + customer.lastName;
        $scope.customerContactInfo = "Contact: " + customer.email;
        $scope.loggedIn = true;
    });

    $scope.logout = function(){
        loginService.logout(configSettings, function(response) {
            $location.path("/home");
            $scope.customerName = "";
            $scope.customerContactInfo = "";
            $scope.loggedIn = false;
        });
    };

    //show header contents in case reload clicked when user in products/order panel
    $scope.$on("show-header", function(event) {
        const customer = customerInfo.getCustomerInfo();
        $scope.customerName = "Hello " + customer.firstName + " " + customer.lastName;
        $scope.customerContactInfo = "Contact: " + customer.email;
        $scope.loggedIn = true;
    });
});

