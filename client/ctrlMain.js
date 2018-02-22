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
            setPageForLoggedInUser(response.data.content.customerInfo);
        }
        else {//NO logged in user on server found
            loadEntryPage(); 
        }
    });

    function loadEntryPage() {
        $location.path("/entry");

        // $templateRequest("../entry.html").then(function(html){
        //     var template = $compile(html)($scope);
        //     angular.element(document.querySelector('#main-placeholder')).empty().append(template);
        // });
    }

    $scope.submit = function(loginInfo) {
  //  $scope.login = function(){
        
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
            loadEntryPage(); 
            $scope.entryMessage = 'Welcome ' + $scope.customer.firstName + ' ' + $scope.customer.lastName;
            $scope.entryAction = 'Start Shopping';
        }
        else { //customer is admin load update product page
            loadProductUpdatePage();          
        }
     }

     $scope.signUp = function() {
        $location.path("/signUp");
        // $templateRequest("signUp/signUp.html").then(function(html){
        //     var template = $compile(html)($scope);
        //     angular.element(document.querySelector('#main-placeholder')).empty().append(template);
        // });
     }

    $scope.$on('customer-added', function(event, customer) {
        setPageForLoggedInUser(customer);
    });
     
    function loadProductUpdatePage() {
        $location.path("/products");
        // $templateRequest("products/products.html").then(function(html){
        //     var template = $compile(html)($scope);
        //     angular.element(document.querySelector('#main-placeholder')).empty().append(template);
        // });
    }

    $scope.shop = function(){
        $location.path("/shop");
        // $templateRequest("shopping-cart/shoppingCart.html").then(function(html){
        //     var template = $compile(html)($scope);
        //     angular.element(document.querySelector('#main-placeholder')).empty().append(template);
        // });
    }

    $scope.logout = function(){
        loginService.logout(configSettings, function(response) {
            alert(JSON.stringify(response));
        });
    }
});

