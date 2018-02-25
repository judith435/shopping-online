shoppingApp.controller('ctrlProductDisplay', function displayProducts(  $scope,
                                                                        $rootScope,
                                                                        productService, 
                                                                        categoryService,
                                                                        imageService, 
                                                                        configSettings)
{
    getProducts();

    function getProducts() {
        productService.getProducts(configSettings, function(products) {
            if (products.data.status === 'error' ) {
                alert('error occured - please contact support center');
                return;
            }
            if (products.data.status === 'userNotLoggedIn' ) {
                alert('user not logged in!!! tried to access product data');
                return;
            }
            $scope.products = products.data.content;
            // $scope.totalCourses = 'Total number of Courses: ' + courses.data.length;
            angular.element(function () {
                $scope.$apply(function($scope) {
                   // imageService.clearCanvasList($scope.products, 'canvas-product-');
                   // imageService.loadCanvasList($scope.products, 'canvas-product-' , configSettings.productImagePath, 'small'); 
                });
            });
        });
    }

    getCategories();

    function getCategories() {
        categoryService.getCategories(configSettings, function(response) {
            if (response.data.status === 'error') {
                alert('error occured - please contact support center');
            }
            else {
                $scope.categories = response.data.content[0];
                $scope.categories.push({value: 0, text: "Search Results"});//add category/tab for product search result
            }
        });
    }

    $scope.searchProduct = function()  {//display update product panel => + add product button clicked
        alert('search product with: ' +  $scope.productSearchParm);
        var lala = $scope.products;
        $scope.active = 0;
    }  

    $scope.$on('product-changed', function(event, opt) {
        getProducts();
        opt.prod.category;
    });

    $scope.productSelected = function(product){
        $rootScope.$broadcast('product-selected', product);
    }


});
