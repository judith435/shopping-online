shoppingApp.controller('ctrlMain', function handleMain( $scope,
                                                        $templateRequest,
                                                        $compile,
                                                        loginService,
                                                        configSettings) 
{

    loginService.checkUserLoggedIn(configSettings, function(response) {
        if (response.data.status === 'error') {
            alert('error occured - please contact support center');
        }
        else {
            alert(JSON.stringify(response.data.content));
        }
    });


    //simulate that admin logged in
    $scope.clientSummary = 'Judith Ilson';
    $templateRequest("../entry.html").then(function(html){
        var template = $compile(html)($scope);
        angular.element(document.querySelector('#main-placeholder')).empty().append(template);
        // angular.element(function () {
        //     $scope.clientSummary = 'Judith Ilson';
        // });
    });

    $scope.login = function(){
        
        var loginInfo = {
            userName: $scope.userName,
            password: $scope.userPassword
        };
    
        loginService.login(configSettings, loginInfo, function(response) {
            if (response.data.status === 'error') {
                alert('error occured - please contact support center');
            }
            else {
                alert(JSON.stringify(response.data.content.customerInfo));
            }
        });
    
        //  $templateRequest("products/products.html").then(function(html){
        //      var template = $compile(html)($scope);
        //      angular.element(document.querySelector('#main-placeholder')).empty().append(template);
        //  });
     }
 
});
