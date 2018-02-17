shoppingApp.controller('ctrlProductDisplay', function displayProducts(  $scope, 
                                                                        $rootScope,
                                                                        productService, categoryService,
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
            $scope.products = products.data.content;
            // $scope.totalCourses = 'Total number of Courses: ' + courses.data.length;
            angular.element(function () {
                $scope.$apply(function($scope) {
                    imageService.clearCanvasList($scope.products, 'canvas-product-');
                    imageService.loadCanvasList($scope.products, 'canvas-product-' , configSettings.productImagePath, 'small'); 
                });
            });
    

        });
    }

    fillCategoriesDDL();

    function fillCategoriesDDL() {
        categoryService.getCategories(configSettings, function(response) {
            if (response.data.status === 'error') {
                alert('error occured - please contact support center');
            }
            else {
                $scope.categories = response.data.content[0];
            }
        });
    }


    $scope.$on('product-changed', function(event) {
        getProducts();
    });

    $scope.productSelected = function(product){
        $rootScope.$broadcast('product-selected', product);

        //$scope.product = product;

        // $templateRequest("../view-course.html").then(function(html){
        //     var template = $compile(html)($scope);
        //     angular.element(document.querySelector('#mainPlaceHolder')).empty().append(template);
        //     angular.element(function () {
        //         $rootScope.$broadcast('handleCourseSelection', {course: course, studentsForCourse: $scope.studentsForCourse});
        //     });
        // });
    }


});
