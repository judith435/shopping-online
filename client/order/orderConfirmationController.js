shoppingApp.controller('orderConfirmationController', function($scope, $uibModalInstance, $location, cartDetails) {

    $scope.downloadReceipt = function () {
        var purchaseDate =  cartDetails.creationDate.substring(8,10) + '/' + 
                            cartDetails.creationDate.substring(5,7) + '/' +
                            cartDetails.creationDate.substring(0,4);
        var fileText = 'Receipt for purchase on ' + purchaseDate + '\r\nList of Items' + buildItemList();
        fileText += '\r\nTotal: ' + cartDetails.cartTotal + '$';
        var fileName = 'receipt_'  + purchaseDate + '.txt';
        saveTextAsFile(fileText, fileName);
    };

    function buildItemList() {
        var items = '';
        for (let i = 0; i < cartDetails.cartItems.length; i++) { 
            items +=  '\r\n' + cartDetails.cartItems[i].productName + ' ' + cartDetails.cartItems[i].quantity +
                      ' unit(s) at ' + cartDetails.cartItems[i].productPrice +
                      '$  => Total for item: ' + cartDetails.cartItems[i].price + '$';
        }
        return items;
    }

    $scope.confirm = function () {

        $uibModalInstance.close();
        $location.path("/home");

    };

    function saveTextAsFile (data, filename){

        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        var blob = new Blob([data], {type: 'text/plain'}),
            e    = document.createEvent('MouseEvents'),
            a    = document.createElement('a')
    // FOR IE:

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename);
        }
        else{
            var e = document.createEvent('MouseEvents'),
                a = document.createElement('a');

            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
            e.initEvent('click', true, false, window,
                0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        }
    }

});
