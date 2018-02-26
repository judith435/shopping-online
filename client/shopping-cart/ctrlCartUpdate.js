shoppingApp.controller('ctrlCartUpdate', function updateProducts($scope,
    // $rootScope, 
                                                                $routeParams,
                                                                $uibModal,
                                                                cartService, 
                                                                imageService, 
                                                                configSettings)
                                                                // $filter)
{
    $scope.cartOwner = 'My Cart: ' + $scope.customer.firstName + ' ' + $scope.customer.lastName
    $scope.cartItems = [];

    if (!$scope.cart) { //no cart found for customer - create one
        addCart(); 
    }
    else {//get last cart items
        cartService.getCartItems(configSettings, $scope.cart.id, function(response) {  
            if (response.data.status === 'error') {
                alert('error occured - please contact support center');
                return;
            }
            $scope.cartItems = response.data.content;
        });
    }

    function addCart() {

        cartService.addCart(configSettings, $scope.customer.teudatZehut, function(response) {  
            if (response.data.status === 'error') {
                alert('error occured - please contact support center');
                return;
            }

            $scope.cart = new Cart ({   id: response.data.content,
                                        customer: $scope.customer.teudatZehut,
                                        creation_date: new Date() 
                                    }) 
        });
    }

    $scope.$on('product-selected', function(event, product) {

        var productDialog = $uibModal.open({
            templateUrl: 'shopping-cart/productDialog.html',
            controller: 'ctrlProductDialog',
            size: 'lg',
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
                                            shoppingCart: $scope.cart.id 
                                        })
                                        
            cartService.addCartItem(configSettings, cartItem, function(response) {  
                if (response.data.status === 'error') {
                    alert('error occured - please contact support center');
                    return;
                }
                cartItem.id = response.data.content;
                $scope.cartItems.push(cartItem);
            });
        });
    });

    $scope.deleteCartItem = function(cartItem) { 
        cartService.deleteCartItem(configSettings, cartItem.id, function(response) {  
            if (response.data.status === 'error') {
                alert('error occured - please contact support center');
                return;
            }
            if (response.data.content === 1) {
                alert('item deleted !!!');
            }
        });
    }
});
