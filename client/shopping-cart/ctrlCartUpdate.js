shoppingApp.controller('ctrlCartUpdate', function updateProducts($scope,
    // $rootScope, 
                                                                // productService, 
                                                                imageService, 
                                                                configSettings,
                                                                $filter)
{

 //  $scope.cartOwner = 

$scope.$on('product-selected', function(event, product) {
    alert ('in ctrlCartUpdate => product: ' + JSON.stringify(product));
    // initUpdatePanel();
    // $scope.product = {};
    // $scope.product = product;
    // $scope.productBeforeUpdate = JSON.parse(JSON.stringify(product)); //used for comparison in validation if product actually updated
    // let categoryOption = $filter('filter')($scope.options, {value: product.category }, true)[0];
    // $scope.product.categoryDDL =  categoryOption; 
    // var drawingCanvas = document.getElementById('canvasProduct');
    // imageService.setCanvas(drawingCanvas, configSettings.productImagePath + $scope.product.id,'regular'); 
    // $scope.activity = 'updateProduct';
});



});


