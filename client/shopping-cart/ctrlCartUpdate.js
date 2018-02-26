shoppingApp.controller('ctrlCartUpdate', function updateProducts($scope,
    // $rootScope, 
                                                            //    $modal,
                                                                $uibModal,
                                                                cartService, 
                                                                imageService, 
                                                                configSettings)
                                                                // $filter)
{

    $scope.cartOwner = 'My Cart: ' + $scope.customer.firstName + ' ' + $scope.customer.lastName

    //add cart
    //addCart();

    function addCart() {

        // let cart = new Cart({   id: 0,
        //     customer: $scope.customer.teudatZehut,
        //     creation_date: Date()});

        cartService.addCart(configSettings, $scope.customer.teudatZehut, function(response) {  
            if (response.data.status === 'error') {
                alert('error occured - please contact support center');
                return;
            }

         alert (JSON.stringify(response));   

        });
         

    }

    $scope.$on('product-selected', function(event, product) {
       // alert ('in ctrlCartUpdate => product: ' + JSON.stringify(product));

        var productDialog = $uibModal.open({
            templateUrl: 'shopping-cart/productDialog.html',
            controller: 'ctrlProductDialog',
            size: 'lg',
            resolve: {
            product: function () {
               return product;
              }
            }
        });

        productDialog.result.then(function (productQuantity) {
            alert ('dialogresult: ' + JSON.stringify(productQuantity));
            alert ('product: ' + JSON.stringify(product));
            //create shopping cart and first item
        });
    });
});

