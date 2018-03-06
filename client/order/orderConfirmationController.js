shoppingApp.controller("orderConfirmationController", function( $scope, 
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
    
    function saveTextAsFile (data, filename){

        if(!data) {
            alert("Console.save: No data");
            return;
        }

        if(!filename) {
            filename = "console.json";
        } 

        var blob = new Blob([data], {type: "text/plain"});
        var e    = document.createEvent("MouseEvents");
        var a    = document.createElement("a");


    // FOR IE:
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        }
        else{
            // e = document.createEvent("MouseEvents");
            // a = document.createElement("a");

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ["text/plain", a.download, a.href].join(":");
            e.initEvent("click", true, false, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        }
    }
    
    $scope.downloadReceipt = function () {
        var purchaseDate =  String(new Date()).substring(4,24);
        var fileText = "Receipt for purchase " + purchaseDate + "\r\nList of Items" + buildItemList();
        fileText += "\r\nTotal: " + order.cartTotal + "$";
        var fileName = "receipt_"  + purchaseDate + ".txt";
        saveTextAsFile(fileText, fileName);
    };

    $scope.confirm = function () {

        $uibModalInstance.close();
        $rootScope.$broadcast("order-submitted", customer);

    };

});
