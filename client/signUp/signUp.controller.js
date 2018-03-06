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
        $scope.id_errorMessage = isNaN($scope.id) || !$scope.id ? "numeric id required" : "";
        $scope.errorsFound = $scope.id_errorMessage !== "" || $scope.errorsFound;
        
        //Email
        $scope.email_errorMessage = !$scope.email ? "valid email  required" : "";
        $scope.errorsFound = $scope.email_errorMessage !== "" || $scope.errorsFound;

        //Passwords
        $scope.password_errorMessage = !$scope.password ? "password required" : "";
        $scope.errorsFound = $scope.password_errorMessage !== "" || $scope.errorsFound;
        
        $scope.confirmPassword_errorMessage = !$scope.confirmPassword ? "confirm password" : "";
        $scope.errorsFound = $scope.confirmPassword_errorMessage !== "" || $scope.errorsFound;

        //passwords entered in both fields => chek  they are the same
        if ($scope.confirmPassword && $scope.password) {
            $scope.confirmPassword_errorMessage = 
                $scope.confirmPassword !== $scope.password ? "password does not match the confirm password" : "";
            $scope.errorsFound = $scope.confirmPassword_errorMessage !== "" || $scope.errorsFound;
        }

        //id/email/passwords missing - no point checking duplicate customer
        if (!$scope.id || !$scope.email || !$scope.password || !$scope.confirmPassword) { 
            return;
        }

        // courseService.checkDuplicateProduct(configSettings, $scope.course, function(response) {
        //     let duplicateCourseID = parseInt(response.data);
        //     $scope.errorsFound = duplicateCourseID !== -1;
        //     $scope.duplicateCourse_errorMessage =  duplicateCourseID !== -1 
        //             ? "course with same name already exists (courseID: " + duplicateCourseID + ")" : "" ;
        // });
    }    

    function validateInputStep2() {    

        $scope.errorsFound = false;

        $scope.city_errorMessage = !$scope.city  ? "City required" : "";
        $scope.errorsFound = $scope.city_errorMessage !== "" || $scope.errorsFound;
        
        $scope.street_errorMessage = !$scope.street ? "Email  required" : "";
        $scope.errorsFound = $scope.street_errorMessage !== "" || $scope.errorsFound;

        $scope.firstName_errorMessage = !$scope.firstName ? "First Name required" : "";
        $scope.errorsFound = $scope.firstName_errorMessage !== "" || $scope.errorsFound;
        
        $scope.lastName_errorMessage = !$scope.lastName ? "Last Name required" : "";
        $scope.errorsFound = $scope.lastName_errorMessage !== "" || $scope.errorsFound;
    }    

    $scope.continueSignUp = function()  {

        validateInputStep1();
        if ($scope.errorsFound) { return; }

        $templateRequest("signUp/step2.html").then(function(html){
            var template = $compile(html)($scope);
            angular.element(document.querySelector("#signUP")).empty().append(template);
        });

    }

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
    }

});
