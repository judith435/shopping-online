shoppingApp.controller('ctrlCartUpdate', function updateProducts($scope,
    // $rootScope, 
                                                                // productService, 
                                                                imageService, 
                                                                configSettings,
                                                                $filter)
{

 $scope.cartOwner = 'My Cart: ' + $scope.customer.firstName + ' ' + $scope.customer.lastName

$scope.$on('product-selected', function(event, product) {
    alert ('in ctrlCartUpdate => product: ' + JSON.stringify(product));
});



});


