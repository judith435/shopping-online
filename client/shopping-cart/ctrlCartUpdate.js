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
       // alert ('in ctrlCartUpdate => product: ' + JSON.stringify(product));

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
            // alert ('dialogresult: ' + JSON.stringify(productQuantity));
            // alert ('product: ' + JSON.stringify(product));
            let cartItem = new CartItem({   id: 0,//response.data.content,
                                            product: product.id,
                                            quantity: productQuantity,
                                            price: productQuantity * product.price ,
                                            shopping_cart: $scope.cart.id 
                                        })
            $scope.cartItems.push(cartItem);
        });
    });
});
