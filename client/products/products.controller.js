shoppingApp.controller('productController', function handleProducts($scope, catgoryService, configSettings)
{
    fillCategoriesDDL();

    function fillCategoriesDDL() {
        catgoryService.getCatgories(configSettings, function(categories) {
            $scope.options = categories.data[0];
        });
    }


    $scope.productName = 'click +  to add product';
    $scope.showProductUpdate = false;


    $scope.addProduct = function()  {
        $scope.showProductUpdate = true;
        $scope.productName_errorMessage = 'product name required';
        $scope.productID = 'ID:'
    }  

});
