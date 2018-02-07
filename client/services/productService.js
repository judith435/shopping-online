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

    // var ajaxData = new FormData();  
    // appendInputData(inputData, ajaxData);

    // function appendInputData(inputData, ajaxData) {
    //     //because of  image upload new FormData() must be used to send data to server and thus it can no longer be sent simply as $("form").serialize() 
    //     //the  individual input fields must be appeded to FormData() as key value pairs => statement below creates object from $("form").serialize() containing
    //     //key value pairs of input data  
    //     var inputDataPairs = 
    //     JSON.parse('{"' + decodeURI(inputData.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
        
    //     for (var key in inputDataPairs) {
    //         if (inputDataPairs.hasOwnProperty(key)) {
    //             // if (app.debugMode) {
    //             //     console.log("sendServerRequest parms from form data serialize  key: " + key + " -> value: " + inputDataPairs[key]);
    //             // }
    //             ajaxData.append(key, inputDataPairs[key]);
    //         }
    //     }
    // }

    this.addProduct = function(configSettings, product, productImage, success, error) {
        var formData = new FormData();

        for (var key in product) {
            if (product.hasOwnProperty(key)) {
                formData.append(key, product[key]);
            }
        }

        formData.append("productImage", productImage);

        //$http.post(configSettings.shoppingApi + '/product', formData,
        $http.put(configSettings.shoppingApi + '/product', formData,
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

