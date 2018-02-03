shoppingApp.controller('mainController', function handleNavigation( $scope,
                                                                    $templateRequest,
                                                                    $compile) 
{

    //simulate that admin logged in
    $templateRequest("../login.html").then(function(html){
        var template = $compile(html)($scope);
        angular.element(document.querySelector('#main-placeholder')).empty().append(template);
    });
});
