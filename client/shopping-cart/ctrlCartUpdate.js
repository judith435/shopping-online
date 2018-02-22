shoppingApp.controller('ctrlCartUpdate', function updateProducts($scope,
    // $rootScope, 
                                                            //    $modal,
                                                                $uibModal,
                                                                // productService, 
                                                                imageService, 
                                                                configSettings,
                                                                $filter)
{

    $scope.cartOwner = 'My Cart: ' + $scope.customer.firstName + ' ' + $scope.customer.lastName

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
            alert ('dialogresult: ' + JSON.stringify(productQuantity));
        });
    });
});

