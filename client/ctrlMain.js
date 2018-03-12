shoppingApp.controller("ctrlMain", function handleMain( $scope,
                                                        configSettings,
                                                        storeService,
                                                        cartService,
                                                        loginService,
                                                        $location,
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
    getStoreStatistics();
    
    function loadHomePage() {
        $location.path("/home");
    }

    function buildDisplayDate(date) {
        return date.substring(8,10) + "/" +   date.substring(5,7) + "/" +   date.substring(0,4);
    }

    function loadProductUpdatePage() {
       // $location.path("/products");
        $location.path("/products").search({source: "updateProduct"});

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

    function setPageForLoggedInUser(cust) { //$scope.customer.
        const customer = new Customer(cust);
        customerInfo.addCustomerInfo(customer);

        $scope.customerName = "Hello " + customer.firstName + " " + customer.lastName;
        $scope.customerContactInfo = "Contact: " + customer.email;

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
            loadProductUpdatePage();          
        }
     }

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

    function init() { 
        $scope.customer = null;
        $scope.customerName = "";
        $scope.customerContactInfo = "";
        $scope.entryAction = "";
        $scope.entryMessage = "";
    }

    $scope.login = function(loginInfo) {
        
        loginService.login(configSettings, loginInfo, function(response) {
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }

            if (response.data.status === "noSuchCustomer") {
                alert("no customer found with login details given");
                init();
                return;
            }
            setPageForLoggedInUser(response.data.content); //.customerInfo)
        });
     };

     $scope.signUp = function() {
        $location.path("/signUp");
     };

    $scope.$on("customer-added", function(event, customer) {
        // $scope.cart = ""; //reset cart info for new customer
        setPageForLoggedInUser(customer);
    });
  
    $scope.$on("order-submitted", function(event, customer) {
        getStoreStatistics();
        setPageForLoggedInUser(customer);
    });

    $scope.shop = function() {
        $location.path("/shop").search({cartStatus: "shop", source: "shop" });
      //  $location.search({target : 'Hi', new : 'else'});
    };

    $scope.logout = function(){
        loginService.logout(configSettings, function(response) {
            loadHomePage(); 
            init();
        });
    };
});