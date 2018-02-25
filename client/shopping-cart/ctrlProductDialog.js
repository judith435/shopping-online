
shoppingApp.controller('ctrlProductDialog', function($scope, $uibModalInstance, product) {

    $scope.productName = product.name;

    $scope.addToCart = function () {

        if ($scope.frmProductDialog.$valid) {
            $uibModalInstance.close($scope.productQuantity);
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
