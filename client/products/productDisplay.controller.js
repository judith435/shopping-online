shoppingApp.controller('ctrlProductDisplay', function displayProducts($scope, productService, imageService, configSettings)
{
    getProducts();

    function getProducts() {
        productService.getProducts(configSettings, function(products) {
            if (products.data.content === 'error' ) {
                alert('error occured - please contact support center');
                return;
            }
            const prod = products.data.content;
            // $scope.keys = Object.keys(prod[0]);
            $scope.products = prod;
            // $scope.totalCourses = 'Total number of Courses: ' + courses.data.length;
            angular.element(function () {
                imageService.loadCanvasList($scope.products, 'canvas-product-' , configSettings.productImagePath, 'small'); 
            });
    

        });
    }

});
