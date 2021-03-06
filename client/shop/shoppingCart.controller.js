shoppingApp.controller("shoppingCart", function updateCart( $scope,
                                                            $rootScope,
                                                            $routeParams,
                                                            customerInfo,
                                                            $uibModal,
                                                            cartService, 
                                                            imageService, 
                                                            configSettings,
                                                            cartInfo,
                                                            $location)
{

    //used to determine if cart in shop ('clear cart' & 'order' link buttons available) 
    //or order ('return to shopping' link button avilable) mode 
    $scope.ordering = $routeParams.cartStatus === "order";
    const customer = customerInfo.getCustomerInfo();
    var cart  = cartInfo.getCartInfo();
    var cartSave; //used for search cart mechanism
    $scope.cartOwner = "My Cart: " + customer.firstName + " " + customer.lastName;
    $scope.cartItems = [];
    
    //necessary to show contents of page header after page reload is clicked
    $rootScope.$broadcast("show-header");

    function addCart() {

        cartService.addCart(configSettings, customer.teudatZehut, function(response) {  
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }

            if (response.data.status === "forbiddenAccessAttempted" ) {
                return;
            }
    
            cart = new Cart ({  id: response.data.content,
                                customer: customer.teudatZehut,
                                creationDate: new Date() 
                            });
            cartInfo.addCartInfo(cart);
        });
    }

    function calcCartTotal() {

        $scope.cartTotal = 0;
        for (let i = 0; i < $scope.cartItems.length; i++) { 
            $scope.cartTotal += $scope.cartItems[i].price;
        }
        $scope.cartTotal = Math.round($scope.cartTotal * 100) / 100;
    }

    function getCartItems() {

        cartService.getCartItems(configSettings, cart.id, function(response) {  
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }
            if (response.data.status === "forbiddenAccessAttempted" ) {
                return;
            }

            $scope.cartItems = response.data.content;
            calcCartTotal();

            if ($scope.ordering) {  //used for search cart mechanism (order mode)
                angular.element(function () {
                    $scope.$apply(function($scope) {
                        cartSave = document.querySelectorAll("#cart .ng-binding");
                    });
                });
            }
        });
    }

    //*******************************************************************************************************
    //cart crea tionstatements performed every time shoppingCart.html (shoppingCart.controller) loaded 
    //*******************************************************************************************************
    //no cart found for customer - create one / 
    //or cart order submitted => in both cases create new cart
    if (!cart || cart.orderDate) { 
        addCart(); 
    }
    else {//get last cart items
        getCartItems();
    }

    //*******************************************************************************************************
    // functions triggered by broadcasting from productDisplay controller (after product selected)
    //*******************************************************************************************************
    $scope.$on("product-selected", function(event, product) {

        var productDialog = $uibModal.open({
            templateUrl: "shop/productDialog.html",
            controller: "productDialog",
            size: "md",
            resolve: {
                product () {
                    return product;
                }
            }
        });

        productDialog.result.then(function (productQuantity) {
            if (!productQuantity) { //cancel clicked in product quantity popup
                return;
            }
            let cartItem = new CartItem({   id: 0,
                                            productID: product.id,
                                            productName: product.name,
                                            productPrice: product.price,
                                            quantity: productQuantity,
                                            price: Math.round(productQuantity * product.price * 100) / 100,
                                            shoppingCart: cart.id 
                                        });
                                        
            cartService.addCartItem(configSettings, cartItem, function(response) {  
                if (response.data.status === "error") {
                    alert("error occured - please contact support center");
                    return;
                }
                cartItem.id = response.data.content;
                $scope.cartItems.push(cartItem);
                calcCartTotal();
            });
        });
    });

    //*******************************************************************************************************
    // functions triggered by clicking on buttons/links on shoppingCart.html
    //*******************************************************************************************************
    $scope.deleteCartItem = function(cartItem) { 
        cartService.deleteCartItem(configSettings, cartItem.id, function(response) {  
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }
            if (response.data.status === "forbiddenAccessAttempted" ) {
                return;
            }
            getCartItems();
        });
    };

    $scope.clearCart = function() { 
        cartService.clearCart(configSettings, cart.id, function(response) {  
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }
            $scope.cartItems = [];
        });
    };

    $scope.order = function() { 
        if ($scope.cartItems.length === 0) {
            alert ("cart empty");
            return;
        }
        cart.cartItems = $scope.cartItems;
        cart.cartTotal = $scope.cartTotal;
        cartInfo.addCartInfo(cart);
        //parm cartStatus necessary to ascertain in order controller if customer went through shopping panel
        //or attempted to access order panel directly
        $location.path("/order").search({cartStatus: "order"});
    };

    $scope.returnToShopping = function() { 
        $location.path("/shop").search({cartStatus: "shop"});
    };

    $scope.searchCart = function(searchArg) {
        var cartItems = cartSave;
        //remove special characters in searchArg some of them mess up search mechanism 
        searchArg = searchArg.replace(/[^a-zA-Z 0-9]+/g, "");  
        var sarg = searchArg ? searchArg : "";//if searchArg empty reset all cart items
        var pattern = new RegExp(sarg, "g");

        for (var i = 0; i < cartItems.length; i++) {
            let item = cartItems[i].innerText.replace(pattern, "<span class='highlighted'>" + sarg + "</span>"); 
            cartItems[i].innerHTML = item;
        } 
    };

});
