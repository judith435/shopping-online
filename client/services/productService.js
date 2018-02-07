shoppingApp.service('productService', function($http) {
    
    this.getProducts = function (configSettings, success) { 
        $http.get(configSettings.shoppingApi +'/product',{}).then(success, error);
    }

    this.checkDuplicateProduct = function (configSettings, product, success) { 
        $http.get(configSettings.shoppingApi + '/product/duplicate', {
            params: {
                product: product 
            }
        }).then(success, error);
    }

    this.addProduct = function(configSettings, product, productImage, success, error) {
        var fd = new FormData();
        fd.append("productImage", productImage);
    
        $http.post(configSettings.shoppingApi + '/product', fd,
        {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
 
        }).then(success, error); 
    }

    // type: verb,
    // url: app.shoppingApi,
    // data: ajaxData,
    // contentType: verb === "POST" ? false : undefined,
    // processData: verb === "POST" ? false : undefined 
  //productService.updateproduct(configSettings, product, $scope.productImage, function(response) {
    this.updateProduct = function(configSettings, product, productImage, success, error) {
        $http({
            url: configSettings.shoppingApi + '/product',
            method: 'PUT',
            params: { product: product } 
        }).then(success, error);
    }


    function error(response) {
        alert("Sorry Error occured in productService: " + JSON.stringify(response));
    }
});

