shoppingApp.controller("ctrlProductDisplay", function displayProducts(  $scope,
                                                                        $rootScope,
                                                                        $location,
                                                                        productService, 
                                                                        categoryService,
                                                                        imageService, 
                                                                        configSettings)
                                                                        
{
    let location = $location.$$path ;
    //alert(" location;  " + location);  

    function getProducts() {
        productService.getProducts(configSettings, location , function(products) {
            if (products.data.status === "error" ) {
                alert("error occured - please contact support center");
                return;
            }
            if (products.data.status === "forbiddenAccessAttempted" ) { 
                let errorMSG = location === "/shop" ? "customer who is not logged in attempted to access shopping panel" 
                    : "administrator who is not logged in or customer attempted to access update product panel";
                alert(errorMSG);
                $location.path("/home");
                return;
            }
            //necessary to show contents of page header after page reload is clicked
            $rootScope.$broadcast("show-header");

            $scope.products = products.data.content;
            angular.element(function () {
                $scope.$apply(function($scope) {
                   imageService.loadCanvasList($scope.products, "canvas-product-" , configSettings.productImagePath, "small"); 
                   imageService.clearCanvasList($scope.products, "canvas-product-");
                });
            });
        });
    }

    getProducts();

    function getCategories() {
        categoryService.getCategories(configSettings, function(response) {
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
            }
            else {
                $scope.categories = response.data.content[0];
                $scope.categories.push({value: 0, text: "Search Results"});//add category/tab for product search result
            }
        });
    }

    getCategories();

    $scope.productFilter = function() {
        if ($scope.active === 0) {
            return $scope.foundProducts;
        }
    };

    $scope.searchProduct = function()  {//display update product panel => + add product button clicked

        $scope.productSearch = true;
        $scope.active = 0;
        $scope.foundProducts = [];
        if (!$scope.products || !$scope.productSearchParm ) {
            return;
        }

        for (let i = 0; i < $scope.products.length; i++) { 
            if ($scope.products[i].name.includes($scope.productSearchParm)) { 
                $scope.foundProducts.push($scope.products[i]);
            }
        }
    };  

    $scope.$on("product-changed", function(event, opt) {
        getProducts();
        $scope.active = opt.prod.category;
    });

    $scope.productSelected = function(product){
        $rootScope.$broadcast("product-selected", product);
    };
});