shoppingApp.controller('ctrlProductUpdate', function updateProducts($scope,
                                                                    $rootScope, 
                                                                    productService, 
                                                                    categoryService, 
                                                                    imageService, 
                                                                    configSettings,
                                                                    $filter)
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

    $scope.addProduct = function()  {//display update product panel => + add product button clicked
        initUpdatePanel();
        $scope.activity = 'addProduct';
    }  

    $scope.productName = 'click +  to add product';
    $scope.showProductUpdate = false; //hide directive containing product cuForm

    $scope.imageUploaded  = function () {
        var drawingCanvas = document.getElementById('canvasProduct');
        imageService.uploadImage(drawingCanvas, $scope.productImage); 
    }

    $scope.$on('product-selected', function(event, product) {
        initUpdatePanel();
        $scope.product = {};
        $scope.product = product;
        $scope.productBeforeUpdate = JSON.parse(JSON.stringify(product)); //used for comparison in validation if product actually updated
        let categoryOption = $filter('filter')($scope.options, {value: product.category }, true)[0];
        $scope.product.categoryDDL =  categoryOption; 
        var drawingCanvas = document.getElementById('canvasProduct');
        imageService.setCanvas(drawingCanvas, configSettings.productImagePath + $scope.product.id,'regular'); 
        $scope.activity = 'updateProduct';
});


    function initUpdatePanel() {
        $scope.showProductUpdate = true; //show directive containing product cuForm
        $scope.product = {};
        $scope.name_errorMessage = '';
        $scope.category_errorMessage = '';
        $scope.price_errorMessage = '';
        $scope.productImage_errorMessage = '';
        $scope.duplicateProduct_errorMessage = '';
        angular.element("#productImage").val(null);
        $scope.productImage = null;
        var drawingCanvas = document.getElementById('canvasProduct');
        imageService.clearImage(drawingCanvas); 
    }

    $scope.saveProduct = function()  {

        validateInput();
        if ($scope.errorsFound) { return; }

        var product = {
            id: $scope.product.id,
            name: $scope.product.name,
            category: $scope.product.categoryDDL.value,
            price: $scope.product.price
        };

        productService.addUpdateProduct($scope.activity, configSettings, product, $scope.productImage, function(response) {  
            if (response.data.status === 'error') {
                alert('error occured - please contact support center');
                return;
            }
            if (response.data.status === 'invalid input') {
                alert(response.data.content);
                return;
            }
          //  alert(JSON.stringify(response));
            $rootScope.$broadcast('product-changed', false);
            angular.element("#productImage").val(null);
            $scope.productImage = null;
        });
    } 

    function validateInput() {    

        $scope.errorsFound = false;

        if ($scope.activity === 'updateProduct') {
            if ($scope.productBeforeUpdate.name === $scope.product.name && 
                $scope.productBeforeUpdate.category === $scope.product.categoryDDL.value &&
                $scope.productBeforeUpdate.price === $scope.product.price &&
                !$scope.productImage) {
                    $scope.duplicateProduct_errorMessage =  'no change in data - no update';  
                    $scope.errorsFound = true;
                    return;
            }
            else {
                $scope.duplicateProduct_errorMessage =  '';  
            }  
        }

        $scope.name_errorMessage = !$scope.product.name  ? 'Name required' : '';
        $scope.errorsFound = $scope.name_errorMessage !== '' || $scope.errorsFound;
        
        $scope.category_errorMessage = !$scope.product.categoryDDL ? 'Category  required' : '';
        $scope.errorsFound = $scope.category_errorMessage !== '' || $scope.errorsFound;

        $scope.price_errorMessage = !$scope.product.price ? 'Price up to 9999.99 $ required' : '';
        $scope.errorsFound = $scope.price_errorMessage !== '' || $scope.errorsFound;

        //product image required for addProduct only
        $scope.productImage_errorMessage = !$scope.productImage && $scope.activity === 'addProduct' ? 'Product Image  required' : '';
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


