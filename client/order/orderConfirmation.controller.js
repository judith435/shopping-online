shoppingApp.controller("orderConfirmation", function(   $scope, 
                                                        $uibModalInstance, 
                                                        $rootScope, 
                                                        orderDetails) {

    const  customer = orderDetails[0];  
    const  order = orderDetails[1];                                                                
    
    function buildItemList() {
        var items = "";
        for (let i = 0; i < order.cartItems.length; i++) { 
            items +=  "\r\n" + order.cartItems[i].productName + " " + order.cartItems[i].quantity +
                      " unit(s) at " + order.cartItems[i].productPrice +
                      "$  => Total for item: " + order.cartItems[i].price + "$";
        }
        return items;
    }

    function WriteToFile(fileContents, fileName)
    {
        var blob = new Blob([fileContents], {type: "text/plain;charset=utf-8"});
        //saveAs function is in FileSaver.js file by By Eli Grey github:  
        //https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md 
        saveAs(blob, fileName); 
    }

    $scope.downloadReceipt = function () {
        var purchaseDate =  String(new Date()).substring(4,24);
        var fileContents = "Receipt for purchase " + purchaseDate + "\r\nList of Items" + buildItemList();
        fileContents += "\r\nTotal: " + order.cartTotal + "$";
        var fileName = "receipt_"  + purchaseDate + ".txt";
        WriteToFile(fileContents, fileName);  
    };

    $scope.confirm = function () {
        $uibModalInstance.close();
        $rootScope.$broadcast("order-submitted", customer);
    };

});
