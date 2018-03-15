shoppingApp.controller("header", function handleHeader( $scope,
                                                        configSettings,
                                                        loginService,
                                                        $location)
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
});