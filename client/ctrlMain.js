shoppingApp.controller('ctrlMain', function handleMain( $scope,
                                                        $location,
                                                        // $templateRequest,
                                                        // $compile,
                                                        loginService,
                                                        cartService, 
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

    $scope.cart = ''; //contains info of last customer cart  if such a cart is found for logged in user

    loginService.checkUserLoggedIn(configSettings, function(response) {
        if (response.data.status === 'error') {
            alert('error occured - please contact support center');
            return;
        }

        if ('customerInfo' in response.data.content) {//logged in user on server found
            setPageForLoggedInUser(response.data.content.customerInfo, 'loggedIn');
        }
        else {//NO logged in user on server found
            loadHomePage(); 
        }
    });

    function loadHomePage() {
        $location.path("/home");
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
                $scope.entryMessage = '';

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
            loadHomePage(); 
            cartService.getLastCart(configSettings, $scope.customer.teudatZehut, function(response) {  
                if (response.data.status === 'error') {
                    alert('error occured - please contact support center');
                    return;
                }

                //action === 'newCustomer' => state after sign up of new customer or 
                //existing customer without cart => never started shopping
                if (action === 'newCustomer' || response.data.content === 'no cart found for customer' ) {
                    $scope.entryAction = 'Start Shopping';
                    $scope.entryMessage = 'Welcome ' + $scope.customer.firstName + ' ' + $scope.customer.lastName +
                                          ' to your first purchase';
                    return;                      
                }

                //existing customer with existing cart
                $scope.cart = new Cart(response.data.content);
                //in case order date exists customer placed order for last open cart and is now startin a new cart => Start Shopping
                $scope.entryAction = $scope.cart.orderDate === 'no order date' ? 'Resume Shopping' : 'Start Shopping';
                let displayDate = buildDisplayDate($scope.cart.orderDate === 'no order date' ?
                    $scope.cart.creationDate : $scope.cart.orderDate);
                $scope.entryMessage = 'Notification: ' +  $scope.cart.orderDate === 'no order date' ? 
                    'You have an open cart from' : 'Your last purchase was on'   + displayDate;
            });
        }
        else { //customer is admin load update product page
            loadProductUpdatePage();          
        }
     }

     function buildDisplayDate(date) {
        return date.substring(8,10) + '/' +   date.substring(5,7) + '/' +   date.substring(0,4);
     }

     $scope.signUp = function() {
        $location.path("/signUp");
     }

    $scope.$on('customer-added', function(event, customer) {
        $scope.cart = ''; //reset cart info for new customer
        setPageForLoggedInUser(customer, 'newCustomer');
    });
     
    function loadProductUpdatePage() {
        $location.path("/products");
    }

    $scope.shop = function() {
        $location.path("/shop").search({cartStatus: 'shop'});;
    }

    $scope.logout = function(){
        loginService.logout(configSettings, function(response) {
            alert(JSON.stringify(response));
        });
    }
});

