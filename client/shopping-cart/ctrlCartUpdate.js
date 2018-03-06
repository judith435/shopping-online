shoppingApp.controller("ctrlCartUpdate", function updateProducts($scope,
                                                                $routeParams,
                                                                customerInfo,
                                                                $uibModal,
                                                                cartService, 
                                                                imageService, 
                                                                configSettings,
                                                                cartInfo,
                                                                $location)
                                                                // $filter)
{
    $scope.ordering = $routeParams.cartStatus === "order";
    const customer = customerInfo.getCustomerInfo();
    var cart  = cartInfo.getCartInfo();

    $scope.cartOwner = "My Cart: " + customer.firstName + " " + customer.lastName
    $scope.cartItems = [];

    //no cart found for customer - create one / or cart order submitted => in both cases create new cart
    if (!cart || cart.orderDate) { 
        addCart(); 
    }
    else {//get last cart items
        getCartItems();
    }

    function addCart() {

        cartService.addCart(configSettings, customer.teudatZehut, function(response) {  
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }

            cart = new Cart ({   id: response.data.content,
                                        customer: customer.teudatZehut,
                                        creationDate: new Date() 
                            });
            cartInfo.addCartInfo(cart);
        });
    }

    function getCartItems() {

        cartService.getCartItems(configSettings, cart.id, function(response) {  
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }
            $scope.cartItems = response.data.content;
            calcCartTotal();
        });
    }



    $scope.$on("product-selected", function(event, product) {

        var productDialog = $uibModal.open({
            templateUrl: "shopping-cart/productDialog.html",
            controller: "ctrlProductDialog",
            size: "lg",
            resolve: {
                product: function () {
                    return product;
                }
            }
        });

        productDialog.result.then(function (productQuantity) {
            let cartItem = new CartItem({   id: 0,
                                            productID: product.id,
                                            productName: product.name,
                                            productPrice: product.price,
                                            quantity: productQuantity,
                                            price: Math.round(productQuantity * product.price * 100) / 100,
                                            shoppingCart: cart.id 
                                        })
                                        
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

    $scope.deleteCartItem = function(cartItem) { 
        cartService.deleteCartItem(configSettings, cartItem.id, function(response) {  
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }
            getCartItems();
        });
    }

    function calcCartTotal() {
        $scope.cartTotal = 0;
        for (let i = 0; i < $scope.cartItems.length; i++) { 
            $scope.cartTotal += $scope.cartItems[i].price;
        }
        $scope.cartTotal = Math.round($scope.cartTotal * 100) / 100

    }

    $scope.clearCart = function() { 
        cartService.clearCart(configSettings, cart.id, function(response) {  
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }
            $scope.cartItems = [];
        });
    }

    $scope.order = function() { 
        if ($scope.cartItems.length === 0) {
            alert ("cart empty");
            return;
        }
        cart.cartItems = $scope.cartItems;
        cart.cartTotal = $scope.cartTotal;
        cartInfo.addCartInfo(cart);

        $location.path("/order").search({cartStatus: "order"});
    }

    $scope.returnToShopping = function() { 
        $location.path("/shop").search({cartStatus: "shop"});
    }

});
