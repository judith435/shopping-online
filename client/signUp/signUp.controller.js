shoppingApp.controller("ctrlSignUp", function signUp(   $scope, 
                                                        $rootScope,
                                                        configSettings, 
                                                        $templateRequest, 
                                                        $compile,
                                                        signUpService) {

    $scope.showStep1 = true;  //show step 1
    $scope.showStep2 = false; //hide step 2
    $scope.options  = configSettings.citiesList;

    function validateInputStep1() {    

        $scope.errorsFound = false;

        //ID
        $scope.idErrorMessage = isNaN($scope.id) || !$scope.id ? "numeric id required" : "";
        $scope.errorsFound = $scope.idErrorMessage !== "" || $scope.errorsFound;
        
        //Email
        $scope.emailErrorMessage = !$scope.email ? "valid email  required" : "";
        $scope.errorsFound = $scope.emailErrorMessage !== "" || $scope.errorsFound;

        //Passwords
        $scope.passwordErrorMessage = !$scope.password ? "password required" : "";
        $scope.errorsFound = $scope.passwordErrorMessage !== "" || $scope.errorsFound;
        
        $scope.confirmPasswordErrorMessage = !$scope.confirmPassword ? "confirm password" : "";
        $scope.errorsFound = $scope.confirmPasswordErrorMessage !== "" || $scope.errorsFound;

        //passwords entered in both fields => chek  they are the same
        if ($scope.confirmPassword && $scope.password) {
            $scope.confirmPasswordErrorMessage = 
                $scope.confirmPassword !== $scope.password ? "password does not match the confirm password" : "";
            $scope.errorsFound = $scope.confirmPasswordErrorMessage !== "" || $scope.errorsFound;
        }

        //id/email/passwords missing - no point checking duplicate customer
        if (!$scope.id || !$scope.email || !$scope.password || !$scope.confirmPassword) { 
            return;
        }

        signUpService.checkDuplicateCustomer(configSettings, 
                                             $scope.id, 
                                             $scope.email, 
                                             function(response) {
            let duplicateCustomerFound = response.data.content.duplicateCustomerFound;
            $scope.errorsFound = duplicateCustomerFound > 0;
            $scope.duplicateCustomerErrorMessage =  duplicateCustomerFound 
                    ? "customer with same id and/or email already exist(s)" : "" ;
        });
    }    

    function validateInputStep2() {    

        $scope.errorsFound = false;

        $scope.cityErrorMessage = !$scope.city  ? "City required" : "";
        $scope.errorsFound = $scope.cityErrorMessage !== "" || $scope.errorsFound;
        
        $scope.streetErrorMessage = !$scope.street ? "Email  required" : "";
        $scope.errorsFound = $scope.streetErrorMessage !== "" || $scope.errorsFound;

        $scope.firstNameErrorMessage = !$scope.firstName ? "First Name required" : "";
        $scope.errorsFound = $scope.firstNameErrorMessage !== "" || $scope.errorsFound;
        
        $scope.lastNameErrorMessage = !$scope.lastName ? "Last Name required" : "";
        $scope.errorsFound = $scope.lastNameErrorMessage !== "" || $scope.errorsFound;
    }    

    $scope.continueSignUp = function()  {

        validateInputStep1();
        if ($scope.errorsFound) { return; }

        $templateRequest("signUp/step2.html").then(function(html){
            var template = $compile(html)($scope);
            angular.element(document.querySelector("#signUP")).empty().append(template);
        });
    };

    $scope.completeSignUp = function()  {

        validateInputStep2();
        if ($scope.errorsFound) { return; }
        
        let customer = new Customer({   teudatZehut: $scope.id,
                                        firstName: $scope.firstName,
                                        lastName: $scope.lastName,
                                        email: $scope.email,
                                        password: $scope.confirmPassword,
                                        street: $scope.street,
                                        city: $scope.city,
                                        role: "customer"});

        signUpService.addCustomer(configSettings, customer, function(response) {  
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }
            if (response.data.status === "invalid input") {
                alert(response.data.content);
                return;
            }
            //after successfull sign up dispay home page
            $rootScope.$broadcast("customer-added", customer);
        });
    };

});
