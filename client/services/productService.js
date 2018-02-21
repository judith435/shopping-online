shoppingApp.service('productService', function($http) {
    
    this.getProducts = function (configSettings, success) { 
        var userInfo = {
            id: 'meir@mommy',
            password: 'year5778'
        };

        $http.get(configSettings.shoppingApi + '/product', {
            params: {
                user: userInfo 
            }
        }).then(success, error);

        // $http.get(configSettings.shoppingApi +'/product',{}).then(success, error);
    }

    this.checkDuplicateProduct = function (configSettings, product, success) { 
        $http.get(configSettings.shoppingApi + '/product/duplicate', {
            params: {
                product: product 
            }
        }).then(success, error);
    }

    this.addUpdateProduct = function(activity, configSettings, product, productImage, success, error) {
        
        var formData = buildFormData(product, productImage);
        
        if (activity === 'updateProduct') {
            $http.put(configSettings.shoppingApi + '/product', formData,
            {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
     
            }).then(success, error); 
        }
        else {
            $http.post(configSettings.shoppingApi + '/product', formData,
            {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
     
            }).then(success, error); 
        }
    }

    function buildFormData(product, productImage) {
        var formData = new FormData();

        for (var key in product) {
            if (product.hasOwnProperty(key)) {
                //if product value undefined (can occur if client validations neutralized) set value to string 'value-from-client-is-undefined' so that server
                //can distinguish between real undefined and string containing word undefined (all values arrive at server as strings as 'undefined')  
                formData.append(key, product[key] === undefined ? 'value-from-client-is-undefined' : product[key] );
            }
        }

        formData.append("productImage", productImage);
        return formData;
    }

    function error(response) {
        alert("Sorry Error occured in productService: " + JSON.stringify(response));
    }
});

