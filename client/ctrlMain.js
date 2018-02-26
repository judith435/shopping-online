shoppingApp.controller('ctrlMain', function handleMain( $scope,
                                                        $location,
                                                        // $templateRequest,
                                                        // $compile,
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
            return;
        }

        if ('customerInfo' in response.data.content) {//logged in user on server found
            setPageForLoggedInUser(response.data.content.customerInfo, 'loggedIn');
        }
        else {//NO logged in user on server found
            loadEntryPage(); 
        }
    });

    function loadEntryPage() {
        $location.path("/entry");
    }

    $scope.login = function(loginInfo) {
        
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
             
            setPageForLoggedInUser(response.data.content, 'afterLogin'); //.customerInfo)
        });
    
     }

     function setPageForLoggedInUser(customerInfo, action) {
        $scope.customer = new Customer(customerInfo);
        $scope.customerName = 'Hello ' + $scope.customer.firstName + ' ' + $scope.customer.lastName;
        $scope.customerContactInfo = 'Contact: ' + $scope.customer.email;

        if ($scope.customer.role === 'customer') {
            loadEntryPage(); 
            $scope.entryMessage = 'Welcome ' + $scope.customer.firstName + ' ' + $scope.customer.lastName;
            $scope.entryAction = 'Start Shopping';
            if (action === 'newCustomer') {
                $scope.entryMessage += ' to your first purchase';
            }
        }
        else { //customer is admin load update product page
            loadProductUpdatePage();          
        }
     }

     $scope.signUp = function() {

        $location.path("/signUp");
     }

    $scope.$on('customer-added', function(event, customer) {
        setPageForLoggedInUser(customer, 'newCustomer');
    });
     
    function loadProductUpdatePage() {
        $location.path("/products");
    }

    $scope.shop = function(){
        $location.path("/shop");
    }

    $scope.logout = function(){
        loginService.logout(configSettings, function(response) {
            alert(JSON.stringify(response));
        });
    }
});

