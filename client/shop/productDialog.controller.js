
shoppingApp.controller("productDialog", function($scope, $uibModalInstance, product) {

    $scope.productName = product.name;
    $scope.productQuantity = 1;
    
    $scope.addToCart = function () {
        if ($scope.formProductDialog.$valid) {
            $uibModalInstance.close($scope.productQuantity);
        }
    };

    $scope.cancel = function () {
        $uibModalInstance.close(0); //productQuantity = 0 => informs shopping cart controller that cancel was clicked
    };
});