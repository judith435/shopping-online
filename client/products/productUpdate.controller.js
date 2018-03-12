shoppingApp.controller("ctrlProductUpdate", function updateProducts($scope,
                                                                    $rootScope, 
                                                                    productService, 
                                                                    categoryService, 
                                                                    imageService, 
                                                                    configSettings,
                                                                    $filter)
{

    function fillCategoriesDDL() {
        categoryService.getCategories(configSettings, function(response) {
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
            }
            else {
                $scope.options = response.data.content[0];
            }
        });
    }

    fillCategoriesDDL();

    function initUpdatePanel() {
        $scope.showProductUpdate = true; //show directive containing product cuForm
        $scope.product = {};
        $scope.showErrorMessages = false;
        $scope.productImageErrorMessage = "";
        $scope.noChangeErrorMessage = "";
        $scope.productName = "click +  to add product";
        angular.element("#productImage").val(null);
        $scope.productImage = null;
        var drawingCanvas = document.getElementById("canvasProduct");
        imageService.clearImage(drawingCanvas); 
    }

    $scope.addProduct = function()  {//display update product panel => + add product button clicked
        initUpdatePanel();
        $scope.activity = "addProduct";
    };  

    $scope.productName = "click +  to add product";
    $scope.showProductUpdate = false; //hide directive containing product cuForm

    $scope.imageUploaded  = function () {
        var drawingCanvas = document.getElementById("canvasProduct");
        imageService.uploadImage(drawingCanvas, $scope.productImage); 
    };

    $scope.$on("product-selected", function(event, product) {
        initUpdatePanel();
        $scope.product = {};
        $scope.product = product;
        $scope.productName = product.name;
        $scope.productBeforeUpdate = JSON.parse(JSON.stringify(product)); //used for comparison in validation if product actually updated
        let categoryOption = $filter("filter")($scope.options, {value: product.category }, true)[0];
        $scope.product.categoryDDL =  categoryOption; 
        var drawingCanvas = document.getElementById("canvasProduct");
        imageService.setCanvas(drawingCanvas, configSettings.productImagePath + $scope.product.id,"regular"); 
        $scope.activity = "updateProduct";
    });


    function validateInput() { 

        if ($scope.activity === "updateProduct") {//relevant for update product only
            if ($scope.productBeforeUpdate.name === $scope.product.name && 
                $scope.productBeforeUpdate.category === $scope.product.categoryDDL.value &&
                $scope.productBeforeUpdate.price === $scope.product.price &&
                !$scope.productImage) {
                    $scope.noChangeErrorMessage =  "no change in data - no update"; 
                    return; //no point in further checking
            }
            $scope.noChangeErrorMessage =  "";  
        }

        //product image validations  
        //product image required for addProduct only
         $scope.productImageErrorMessage = !$scope.productImage && $scope.activity === "addProduct" ? "Product Image  required" : "";
        
        if ($scope.productImage) { //check image extensions/size => no point checking if no image uploaded
            //check image file extensions
            var extension = $scope.productImage.name.split(".").pop().toLowerCase();
            $scope.productImageErrorMessage = $.inArray(extension, ["jpg", "jpeg", "png", "gif"]) === -1 ? "Valid extensions: jpg, jpeg, png or gif" : "";
            if ($scope.productImageErrorMessage) {
                return;
            }
            //check image size
            $scope.productImageErrorMessage = $scope.productImage.size > 5000000 ? "Image larger than 5MB - actual size: " + $scope.productImage.size + " bytes" : "";
        }

    }    

    $scope.saveProduct = function()  {

        $scope.showErrorMessages = false;

        validateInput();
        if ($scope.formProductCU.$invalid || $scope.noChangeErrorMessage || $scope.productImageErrorMessage) {
            $scope.showErrorMessages = true;
            return; 
        }

        var product = {
            id: $scope.product.id,
            name: $scope.product.name,
            category: $scope.product.categoryDDL.value,
            price: $scope.product.price
        };

        productService.addUpdateProduct($scope.activity, configSettings, product, $scope.productImage, function(response) {  
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }
            if (response.data.status === "invalid input") {
                alert(response.data.content);
                return;
            }

            if (response.data.status === "forbiddenAccessAttempted" ) {
                alert("user who is not logged in or customer attempted to update product");
                return;
            }

            $rootScope.$broadcast("product-changed", {prod: product});
            initUpdatePanel();
            $scope.activity = "addProduct";
        });
    }; 
});


