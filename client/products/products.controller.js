shoppingApp.controller('productController', function handleProducts($scope)
{
    $scope.productName = 'click +  to add product';
    $scope.showProductUpdate = false;

    $scope.addProduct = function()  {
        $scope.showProductUpdate = true;
        $scope.productName_errorMessage = 'product name required';
    }  

});
