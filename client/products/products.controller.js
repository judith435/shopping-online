shoppingApp.controller('productController', function handleProducts($scope, productService, categoryService, imageService, configSettings)
{
    fillCategoriesDDL();

    function fillCategoriesDDL() {
        categoryService.getCategories(configSettings, function(categories) {
            $scope.options = categories.data[0];
        });
    }


    $scope.productName = 'click +  to add product';
    $scope.showProductUpdate = false;

    $scope.imageUploaded  = function () {
        var drawingCanvas = document.getElementById('canvasProduct');
        imageService.uploadImage(drawingCanvas, $scope.productImage); 
    }


    $scope.addProduct = function()  {
        $scope.showProductUpdate = true;
        $scope.productName_errorMessage = 'product name required';
        $scope.productID = 'ID:'
    }  

    $scope.saveProduct = function()  {

        var product = {
            id: $scope.product.productID,
            productName: $scope.product.productName,
            productCategory: $scope.product.category
        };

        // validateInput();

        // if ($scope.errorsFound) { return; }
        // alert ('no errors found!!!');


        // if ($rootScope.updateCourse) {
        //     courseService.updateCourse(configSettings, course, $scope.courseImage, function(response) {
              
        //         if (response.data === 'course updated successfully') {
        //             $rootScope.$broadcast('refreshAfterCourseStudentUpdate', {});
        //         }
        //             //$scope.message = (JSON.stringify(response.data));
        //     });
        // } 
        // else {
            productService.addProduct(configSettings, product, $scope.productImage, function(response) {
                //courseService.updateCourse(configSettings, course, $scope.courseImage, function(response) {
                alert  (JSON.stringify(response.data));
                // if (response.data === 'course updated successfully') {
                //    $rootScope.$broadcast('refreshAfterCourseStudentUpdate', {});
                // }
                //$scope.message = (JSON.stringify(response.data));
            });
        // }
    } 

});


