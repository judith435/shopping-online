shoppingApp.service("productService", function($http) {
    
    function error(response) {
        alert("Sorry Error occured in productService: " + JSON.stringify(response));
    }

    this.getProducts = function (configSettings, actionSource, success) { 

        $http.get(configSettings.shoppingApi + "/product", {
            params: {
                source: actionSource //used for authentication on server : shop or product (admin)
            }
        }).then(success, error);

        // $http.get(configSettings.shoppingApi +"/product",{}).then(success, error);
    };

    function buildFormData(product, productImage) {
        var formData = new FormData();

        for (var key in product) {
            if (product.hasOwnProperty(key)) {
                //if product value undefined (can occur if client validations neutralized) set value to string "value-from-client-is-undefined" so that server
                //can distinguish between real undefined and string containing word undefined (all values arrive at server as strings as "undefined")  
                formData.append(key, product[key] === undefined ? "value-from-client-is-undefined" : product[key] );
            }
        }

        formData.append("productImage", productImage);
        return formData;
    }

    this.addUpdateProduct = function(activity, configSettings, product, productImage, success, error) {
        
        var formData = buildFormData(product, productImage);
        
        if (activity === "updateProduct") {
            $http.put(configSettings.shoppingApi + "/product", formData,
            {
                transformRequest: angular.identity,
                headers: {"Content-Type": undefined}
     
            }).then(success, error); 
        }
        else {
            $http.post(configSettings.shoppingApi + "/product", formData,
            {
                transformRequest: angular.identity,
                headers: {"Content-Type": undefined}
     
            }).then(success, error); 
        }
    };
});