shoppingApp.controller('orderConfirmationController', function($scope, $uibModalInstance, $location) {

    $scope.downloadReceipt = function () {
        var fileText = "receipt for purchase on 28/02/2018\r\nList of Items\r\nguavas\r\nIce Cream";
        var fileName = "receipt.txt"
        saveTextAsFile(fileText, fileName);

    };

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
