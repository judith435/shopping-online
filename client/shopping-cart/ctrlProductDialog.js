
shoppingApp.controller('ctrlProductDialog', function($scope, $uibModalInstance, product) {

    $scope.productName = product.name;

    $scope.addToCart = function () {

        if (!$scope.productQuantity) {
            $scope.quantity_errorMessage = 'enter quantity between 1 and 999'; 
            return;
        }

        $uibModalInstance.close($scope.productQuantity);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

