shoppingApp.controller('productUpdateController', function handleProducts($scope, productService, categoryService, imageService, configSettings)
{
    fillCategoriesDDL();

    function fillCategoriesDDL() {
        categoryService.getCategories(configSettings, function(response) {
            if (response.data.status === 'error') {
                alert('error occured - please contact support center');
            }
            else {
                $scope.options = response.data.content[0];
            }
        });
    }


    $scope.productName = 'click +  to add product';
    $scope.showProductUpdate = false; //hide directive containing product cuForm

    $scope.imageUploaded  = function () {
        var drawingCanvas = document.getElementById('canvasProduct');
        imageService.uploadImage(drawingCanvas, $scope.productImage); 
    }


    $scope.addProduct = function()  {
        $scope.showProductUpdate = true; //show directive containing product cuForm
        $scope.product = {};
        $scope.product.id = 'ID:'
    }  

    $scope.saveProduct = function()  {

        var product = {
            id: $scope.product.id,
            name: $scope.product.name,
            category: $scope.product.category,
            price: $scope.product.price
        };

        // validateInput();
        // if ($scope.errorsFound) { return; }


        // if ($rootScope.updateCourse) {
        //     courseService.updateCourse(configSettings, course, $scope.courseImage, function(response) {
              
        //         if (response.data === 'course updated successfully') {
        //             $rootScope.$broadcast('refreshAfterCourseStudentUpdate', {});
        //         }
        //             //$scope.message = (JSON.stringify(response.data));
        //     });
        // } 
        // else {
            productService.addProduct(configSettings, product, $scope.productImage, function(response) {  //            if (response.data.status === 'error') {
                if (response.data.status === 'error') {
                    alert('error occured - please contact support center');
                }
                else {
                    alert  (response.data.content);
                }
                //courseService.updateCourse(configSettings, course, $scope.courseImage, function(response) {
                // if (response.data === 'course updated successfully') {
                //    $rootScope.$broadcast('refreshAfterCourseStudentUpdate', {});
                // }
                //$scope.message = (JSON.stringify(response.data));
            });
        // }
    } 

    function validateInput() {
        $scope.errorsFound = false;

        // if ($rootScope.updateCourse) {
        //     var data = sessionStorage.getItem("courseBeforeChange");
        //     var courseBeforeChange = JSON.parse(data);

        //     if (courseBeforeChange.courseName === $scope.course.courseName && 
        //         courseBeforeChange.courseDescription === $scope.course.courseDescription) {
        //             $scope.duplicateCourse_errorMessage =  'no change in data - no update';  
        //             $scope.errorsFound = true;
        //             return;
        //     }  
        // }

        $scope.name_errorMessage = !$scope.product.name  ? 'Name required' : '';
        $scope.errorsFound = $scope.name_errorMessage !== '' || $scope.errorsFound;
        $scope.price_errorMessage = !$scope.product.price ? 'Price up to 9999.99 $ required' : '';
        $scope.errorsFound = $scope.price_errorMessage !== '' || $scope.errorsFound;
        $scope.category_errorMessage = !$scope.product.category ? 'Category  required' : '';
        $scope.errorsFound = $scope.category_errorMessage !== '' || $scope.errorsFound;
        $scope.productImage_errorMessage = !$scope.productImage ? 'Product Image  required' : '';
        $scope.errorsFound = $scope.productImage_errorMessage !== '' || $scope.errorsFound;
        
        if ($scope.productImage) { //check image extensions/size => no point checking if no image uploaded

            var extension = $scope.productImage.name.split(".").pop().toLowerCase();
            $scope.productImage_errorMessage = $.inArray(extension, ['jpg', 'jpeg', 'png', 'gif']) === -1 ? 'Valid extensions: jpg, jpeg, png or gif' : '';
            $scope.errorsFound = $scope.productImage_errorMessage !== '' || $scope.errorsFound;
    
            if ($scope.productImage_errorMessage) {
                return;
            }
    
            $scope.productImage_errorMessage = $scope.productImage.size > 5000000 ? 'Image larger than 5MB - actual size: ' + $scope.productImage.size + ' bytes' : '';
            $scope.errorsFound = $scope.productImage_errorMessage !== '' || $scope.errorsFound;
        }

        if (!$scope.product.name || !$scope.product.price || !$scope.product.category) { //product name missing - no point checking duplicate product
            return;
        }

        // courseService.checkDuplicateProduct(configSettings, $scope.course, function(response) {
        //     let duplicateCourseID = parseInt(response.data);
        //     $scope.errorsFound = duplicateCourseID !== -1;
        //     $scope.duplicateCourse_errorMessage =  duplicateCourseID !== -1 
        //             ? 'course with same name already exists (courseID: ' + duplicateCourseID + ')' : '' ;
        // });
    }    


});


