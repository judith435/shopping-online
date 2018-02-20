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
                setPageForLoggedInUser(response.data.content.customerInfo);
            }
        }
    });

    $templateRequest("../entry.html").then(function(html){
        var template = $compile(html)($scope);
        angular.element(document.querySelector('#main-placeholder')).empty().append(template);
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
                $scope.entryAction = '';

                return;
            }
             
            setPageForLoggedInUser(response.data.content.customerInfo);
        });
    
     }

     function setPageForLoggedInUser(customerInfo) {
         
        $scope.customer = new Customer(customerInfo);
        $scope.customerName = 'Hello ' + $scope.customer.firstName + ' ' + $scope.customer.lastName;
        $scope.customerContactInfo = 'Contact: ' + $scope.customer.email;

        if ($scope.customer.role === 'customer') {
            $scope.entryMessage = 'Welcome ' + $scope.customer.firstName + ' ' + $scope.customer.lastName;
            $scope.entryAction = 'Start Shopping';
        }
        else { //customer is admin load update product page
            loadProductUpdatePage();          
        }
     }

     $scope.signUp = function() {
        $templateRequest("signUp/signUp.html").then(function(html){
            var template = $compile(html)($scope);
            angular.element(document.querySelector('#main-placeholder')).empty().append(template);
        });

     }

    function loadProductUpdatePage() {
        $templateRequest("products/products.html").then(function(html){
            var template = $compile(html)($scope);
            angular.element(document.querySelector('#main-placeholder')).empty().append(template);
        });
    }

    $scope.logout = function(){

        loginService.logout(configSettings, function(response) {
            alert(JSON.stringify(response));
        });
    }
});

