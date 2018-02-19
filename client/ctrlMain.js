shoppingApp.controller('ctrlMain', function handleMain( $scope,
                                                        $templateRequest,
                                                        $compile,
                                                        loginService,
                                                        configSettings) 
{

    loginService.checkUserLoggedIn(configSettings, function(response) {
        if (response.data.status === 'error') {
            alert('error occured - please contact support center');
        }
        else {
            if ('customerInfo' in response.data.content) {
                $scope.entryMessage = 'user logged!!!';
                setCustomerInfo(response.data.content.customerInfo);
                if ($scope.customer.role === 'admin') {
                    $scope.entryMessage = 'Login to update products';
                }
            }

            // let baba = Object.keys(response.data.content);
            // let tata = response.data.content;
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
            }
            else {
                setCustomerInfo(response.data.content.customerInfo);
            }
        });
    
        //  $templateRequest("products/products.html").then(function(html){
        //      var template = $compile(html)($scope);
        //      angular.element(document.querySelector('#main-placeholder')).empty().append(template);
        //  });
     }

     function setCustomerInfo(customerInfo) {
        $scope.customer = new Customer(customerInfo);
        $scope.customerName = 'Hello ' + $scope.customer.firstName + ' ' + $scope.customer.lastName;
        $scope.customerContactInfo = 'Contact: ' + $scope.customer.email;

     }
 
});

