shoppingApp.controller('ctrlMain', function handleMain( $scope,
                                                        $templateRequest,
                                                        $compile,
                                                        loginService,
                                                        configSettings) 
{

    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //simulate user trying to access product data with out being logged in
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // $templateRequest("products/products.html").then(function(html){
    //     var template = $compile(html)($scope);
    //     angular.element(document.querySelector('#main-placeholder')).empty().append(template);
    // });

    // return;


    loginService.checkUserLoggedIn(configSettings, function(response) {
        if (response.data.status === 'error') {
            alert('error occured - please contact support center');
        }
        else {
            if ('customerInfo' in response.data.content) {//logged in user on server found
                setCustomerInfo(response.data.content.customerInfo);
                if ($scope.customer.role === 'admin') {
                    $scope.entryMessage = 'Login to update products';
                }
            }
        }
    });

    $templateRequest("../entry.html").then(function(html){
        var template = $compile(html)($scope);
        angular.element(document.querySelector('#main-placeholder')).empty().append(template);
        // angular.element(function () {
        //     $scope.customerName = 'Judith Ilson';
        // });
    });

    $scope.login = function(){
        
        var loginInfo = {
            userName: $scope.userName,
            password: $scope.userPassword
        };
    
        loginService.login(configSettings, loginInfo, function(response) {
            if (response.data.status === 'error') {
                alert('error occured - please contact support center');
                return;
            }

            if (response.data.status === 'noSuchCustomer') {
                alert('no customer found with login details given');
                $scope.customer = null;
                $scope.customerName = '';
                $scope.customerContactInfo = '';
                $scope.entryMessage = '';

                return;
            }
             
            setCustomerInfo(response.data.content.customerInfo);
            if ($scope.customer.role === 'admin') {
                $templateRequest("products/products.html").then(function(html){
                    var template = $compile(html)($scope);
                    angular.element(document.querySelector('#main-placeholder')).empty().append(template);
                });
            }
        });
    
     }

     function setCustomerInfo(customerInfo) {
        $scope.customer = new Customer(customerInfo);
        $scope.customerName = 'Hello ' + $scope.customer.firstName + ' ' + $scope.customer.lastName;
        $scope.customerContactInfo = 'Contact: ' + $scope.customer.email;

     }
 
     $scope.signUp = function() {
        $templateRequest("signUp/step1.html").then(function(html){
            var template = $compile(html)($scope);
            angular.element(document.querySelector('#main-placeholder')).empty().append(template);
        });

     }

});

