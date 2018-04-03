shoppingApp.controller("home", function handleHome( $scope,
                                                    configSettings,
                                                    storeService,
                                                    cartService,
                                                    loginService,
                                                    $location,
                                                    $rootScope, 
                                                    customerInfo,
                                                    cartInfo)
{
    var cart = ""; //contains info of last customer cart  if such a cart is found for logged in user

    function getStoreStatistics() {
        storeService.getStoreStatistics(configSettings, function(response) {
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
            }
            else {
                $scope.numberProducts = response.data.content.numberProducts;
                $scope.numberOrders = response.data.content.numberOrders;
            }
        });
    }
    
    function loadHomePage() {
        $location.path("/home");
    }

    function buildDisplayDate(date) {
        return date.substring(8,10) + "/" +   date.substring(5,7) + "/" +   date.substring(0,4);
    }

    function handleCustomerWithCart(response) {
        //customer with cart: last cart can be open  => resume shopping 
        //or closed => order submitted for last cart 
        cart = new Cart(response.data.content);
        cartInfo.addCartInfo(cart);

        //in case order date exists customer placed order for last open cart and is now starting a new cart => Start Shopping
        $scope.entryAction = !cart.orderDate ? "Resume Shopping" : "Start Shopping";

        let displayDate = buildDisplayDate(!cart.orderDate ?
            cart.creationDate : cart.orderDate);
        let notification = !cart.orderDate  ? "You have an open cart from " : "Your last purchase was on ";    
        $scope.entryMessage = "Notification: " +  notification + displayDate;
        
    }

    function init() { 
        $scope.customer = null;
        $scope.entryAction = "";
        $scope.entryMessage = "";
    }

    function setPageForLoggedInUser(cust) { 
        const customer = new Customer(cust);
        customerInfo.addCustomerInfo(customer);
        $rootScope.$broadcast("set-header-info", customer);

        if (customer.role === "customer") {
            loadHomePage(); 
            cartService.getLastCart(configSettings, customer.teudatZehut, function(response) {  
                if (response.data.status === "error") {
                    alert("error occured - please contact support center");
                    return;
                }

                //customer without cart => never started shopping
                if (response.data.content === "no cart found for customer" ) {
                    $scope.entryAction = "Start Shopping";
                    $scope.entryMessage = "Welcome " + customer.firstName + " " + customer.lastName +
                                          " to your first purchase";
                    return;                      
                }

                handleCustomerWithCart(response);
            });
        }
        else { //customer is admin load update product page
            $location.path("/products");
        }
     }

    //*******************************************************************************************************
    //statements performed every time home.html (home.controller) loaded 
    //*******************************************************************************************************
    getStoreStatistics();
    loginService.checkUserLoggedIn(configSettings, function(response) {
        if (response.data.status === "error") {
            alert("error occured - please contact support center");
            return;
        }

        if ("customerInfo" in response.data.content) {//logged in user on server found
            setPageForLoggedInUser(response.data.content.customerInfo);
        }
        else {//NO logged in user on server found
            loadHomePage(); 
        }
    });


    //*******************************************************************************************************
    // functions triggered by clicking on buttons/links on home.html
    //*******************************************************************************************************
    $scope.login = function() {
 
        if ($scope.formLogin.$invalid) {
            $scope.showErrorMessages = true;
            return; 
        } 

        let loginData = new Login({ 
            email: $scope.email,
            passWord: $scope.password
        });

        loginService.login(configSettings, loginData, function(response) {
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }

            if (response.data.status === "noSuchCustomer") {
                alert("no customer found with login details given");
                init();
                return;
            }

            setPageForLoggedInUser(response.data.content);  
        });
     };

    $scope.signUp = function() {
        $location.path("/signUp");
    };

    $scope.shop = function() {
        $location.path("/shop").search({cartStatus: "shop"});
    };

    //*******************************************************************************************************
    // functions triggered by broadcasting from other controllers
    //*******************************************************************************************************
    $rootScope.$on("init-home-page", function() { //perform after logout clicked in page header
        init();
    });

    $rootScope.$on("customer-added", function(event, customer) {
        cartInfo.deleteCartInfo(); //remove any cart info remaining in session storage from previous customer
        setPageForLoggedInUser(customer);
    });
  
    $rootScope.$on("order-submitted", function(event, customer) {
        getStoreStatistics();
        setPageForLoggedInUser(customer);
    });

});