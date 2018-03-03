shoppingApp.controller('ctrlOrder', function signUp($scope, 
                                                    configSettings,
                                                    $uibModal)   { 
    // $rootScope,
    // $templateRequest, 
    // $compile,
    // signUpService) {

    $scope.options  = configSettings.citiesList;

    $scope.inputDoubleClick = function(inputCtrl)  {
        if (inputCtrl.name === 'city') {
            $scope.city = $scope.customer.city;
        }
        else {
            $scope.street = $scope.customer.street;
        }
    }


    $scope.order = function()  {

        validateInput();
        if ($scope.errorsFound) { return; }

        let dati = $scope.deliveryDate.getDate() + '/' + 
        ($scope.deliveryDate.getMonth() + 1) + '/' +
        $scope.deliveryDate.getFullYear();
        alert('submit order date selected: ' + dati);

        var confirmationDialog = $uibModal.open({
            templateUrl: 'order/orderConfirmation.html',
            controller: 'orderConfirmationController',
            size: 'md',
            // resolve: {
            //     product: function () {
            //         return product;
            //     }
            // }
        });
    }

    function validateInput() {    

        $scope.errorsFound = false;

        if ($scope.creditCard) {
            var ccRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
            var ccValid = ccRegex.test($scope.creditCard.replace(/\s/g, ''));
            $scope.creditCard_errorMessage = !ccValid  ? 'Invalid Credit Card' : 'Credit Card Valid';
            $scope.errorsFound = !ccValid;
        }
        else {
            $scope.creditCard_errorMessage =   'Credit Card required';
            $scope.errorsFound = true;
        }
    }

    //datepicker functions
    $scope.openDatePicker = function() {
        $scope.DatePicker.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.deliveryDate = new Date(year, month, day);
    };

    // $scope.today = function() {
    //     // alert ('clicked today');
    //     $scope.deliveryDate = new Date();
    // };

    $scope.clear = function() {
        $scope.deliveryDate = null;
    };

    //$scope.today();
    $scope.format = 'dd/MM/yyyy';
    $scope.dateOptions = {
        dateDisabled: disabled,
        maxDate: new Date().setMonth(new Date().getMonth() + 2),
        minDate: new Date(),
        startingDay: 7
    };

    // // Disable days with more than 3 orders
    function disabled(data) {
        let date = data.date, mode = data.mode;
            //return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            return mode === 'day' && (date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() === '1/3/2018');
    }

    $scope.DatePicker = {
        opened: false
    };
    //datepicker functions end

    $scope.editCreditCard = function() {  

        var ccIN = $scope.creditCard;
        var ccOUT = '';
        ccIN = ccIN.replace(/\s/g, '');
        for (var i=0; i < ccIN.length; i++) {
            if (i%4 == 0 && i > 0) {
                ccOUT = ccOUT.concat(' ');
            }
            ccOUT = ccOUT.concat(ccIN[i]);
        }
        $scope.creditCard = ccOUT;
    };

});
