shoppingApp.directive("fileModel", ["$parse", function ($parse) { //used for product image upload
    return {
       restrict: "A",
       link(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;
          
          element.bind("change", function(){
             scope.$apply(function(){
                var fileUploaded = element[0].files[0];
                modelSetter(scope, fileUploaded);
                scope.imageUploaded();
             });
          });
       }
    };
 }]);