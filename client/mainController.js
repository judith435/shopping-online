shoppingApp.controller('mainController', function handleNavigation( $scope,
                                                                    $templateRequest,
                                                                    $compile) 
{

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
         $templateRequest("../products.html").then(function(html){
             var template = $compile(html)($scope);
             angular.element(document.querySelector('#main-placeholder')).empty().append(template);
         });
     }
 
});
