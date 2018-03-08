shoppingApp.controller("ctrlSignUp", function signUp(   $scope, 
                                                        $rootScope,
                                                        configSettings, 
                                                        $templateRequest, 
                                                        $compile,
                                                        signUpService) {

    $scope.showStep1 = true;  //show step 1
    $scope.showStep2 = false; //hide step 2
    $scope.options  = configSettings.citiesList;

    function validateInputStep1(callback) {    

        $scope.errorsFound = false;
        //initialize for every validation => duplicateCustomer test performed conditionally 
        $scope.duplicateCustomerErrorMessage = ""; 

        //ID
        $scope.idErrorMessage = isNaN($scope.id) || !$scope.id ? "numeric id required" : "";
        
        //Email
        $scope.emailErrorMessage = !$scope.email ? "valid email  required" : "";

        //Passwords
        $scope.passwordErrorMessage = !$scope.password ? "password required" : "";
        
        $scope.confirmPasswordErrorMessage = !$scope.confirmPassword ? "confirm password" : "";

        //passwords entered in both fields => chek  they are the same
        if ($scope.confirmPassword && $scope.password) {
            $scope.confirmPasswordErrorMessage = 
                $scope.confirmPassword !== $scope.password ? "password does not match the confirm password" : "";
        }

        $scope.errorsFound =    $scope.idErrorMessage ||
                                $scope.emailErrorMessage ||
                                $scope.passwordErrorMessage ||
                                $scope.confirmPasswordErrorMessage;

        //id/email/passwords missing - or other errors found 
        //no point checking duplicate customer => overhead of going to server
        // if ($scope.id && $scope.email && $scope.password && $scope.confirmPassword
        //      && !$scope.errorsFound) { 
            signUpService.checkDuplicateCustomer(configSettings, 
                                             $scope.id, 
                                             $scope.email, 
                                             function(response) {
            let duplicateCustomerFound = response.data.content.duplicateCustomerFound;
            $scope.errorsFound = duplicateCustomerFound > 0 || $scope.errorsFound;
            $scope.duplicateCustomerErrorMessage =  duplicateCustomerFound > 0 
                    ? "customer with same id and/or email already exist(s)" : "" ;
                callback($scope.errorsFound);
            });
        // }
    }    

    function validateInputStep2() {    

        $scope.errorsFound = false;

        $scope.cityErrorMessage = !$scope.city  ? "City required" : "";
        
        $scope.streetErrorMessage = !$scope.street ? "Email  required" : "";

        $scope.firstNameErrorMessage = !$scope.firstName ? "First Name required" : "";
        
        $scope.lastNameErrorMessage = !$scope.lastName ? "Last Name required" : "";

        $scope.errorsFound =    $scope.cityErrorMessage ||
                                $scope.streetErrorMessage ||
                                $scope.firstNameErrorMessage ||
                                $scope.lastNameErrorMessage;
    }    

    $scope.continueSignUp = function()  {

        validateInputStep1(function(errorsFound) {

            //if (errorsFound) { return; }
    
            $templateRequest("signUp/step2.html").then(function(html){
                var template = $compile(html)($scope);
                angular.element(document.querySelector("#signUP")).empty().append(template);
            });
        });
    };

    $scope.completeSignUp = function()  {

        validateInputStep2();
       // if ($scope.errorsFound) { return; }
        
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
