shoppingApp.controller("header", function handleHeader( $scope,//,
    configSettings,
    // storeService,
    // cartService,
    loginService,
    $location)
    // customerInfo,
    //cartInfo)
{

    $scope.logout = function(){
        alert("logout clicked!!!");
        loginService.logout(configSettings, function(response) {
            $location.path("/home");
            // loadHomePage(); 
            // init();
        });
    };
});