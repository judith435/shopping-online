shoppingApp.controller('ctrlCartUpdate', function updateProducts($scope,
    // $rootScope, 
                                                                $modal,
                                                                // productService, 
                                                                imageService, 
                                                                configSettings,
                                                                $filter)
{

    $scope.cartOwner = 'My Cart: ' + $scope.customer.firstName + ' ' + $scope.customer.lastName

    $scope.$on('product-selected', function(event, product) {
        alert ('in ctrlCartUpdate => product: ' + JSON.stringify(product));
        var productDialog = $modal.open({
            templateUrl: 'popup.html',
            controller: 'productDialogCtrl',
            size: 'lg',
            resolve: {
              selectedUsr: function () {
                return $scope.usr;
              }
            }
          });

          productDialog.result.then(function (newusr) {
            $scope.usrs.push(newusr);
            $scope.usr = {name: '', job: '', age: '', sal: '', addr:''};
        });




    });



});


