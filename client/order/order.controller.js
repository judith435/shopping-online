shoppingApp.controller('ctrlOrder', function signUp($scope, 
                                                    configSettings,
                                                    customerInfo,
                                                    cartInfo,
                                                    orderService,
                                                    $uibModal)   { 
    // $rootScope,
    // $templateRequest, 
    // $compile,
    // signUpService) {

    $scope.options  = configSettings.citiesList;
    const customer = customerInfo.getCustomerInfo();
    var filledDeliveryDates;

    orderService.getDeliveryDates(configSettings, function(response) {  
        if (response.data.status === 'error') {
            alert('error occured - please contact support center');
            return;
        }
        alert (JSON.stringify(response.data.content));
        filledDeliveryDates = response.data.content.map(record => record.deliveryDate);
    });


    $scope.inputDoubleClick = function(inputCtrl)  {
        if (inputCtrl.name === 'city') {
            $scope.order.city = customer.city;
        }
        else {
            $scope.order.street = customer.street;
        }
    }


    $scope.order = function()  {

        validateInput();
        if ($scope.errorsFound) { return; }

        let cartDetails = cartInfo.getCartInfo(); 
        let deliveryDate =  $scope.order.deliveryDate.getFullYear() + '-' +
                            ($scope.order.deliveryDate.getMonth() + 1) + '-' +
                            $scope.order.deliveryDate.getDate();
        let order = new Order({ customer: customer.teudatZehut,
                                shoppingCart: cartDetails.id,
                                price: cartDetails.cartTotal,
                                deliveryCity: $scope.order.city,
                                deliveryStreet: $scope.order.street,
                                deliveryDate: deliveryDate,
                                ccInfo: $scope.order.creditCard.substring(15)});

        orderService.addOrder(configSettings, order, function(response) {  
            if (response.data.status === 'error') {
                alert('error occured - please contact support center');
                return;
            }
            if (response.data.status === 'invalid input') {
                alert(response.data.content);
                return;
            }

            var orderDetails = [];
            orderDetails.push(customer);
            orderDetails.push(cartDetails);

            //after successfull save of order dispay order popup
            var confirmationDialog = $uibModal.open({
                templateUrl: 'order/orderConfirmation.html',
                controller: 'orderConfirmationController',
                size: 'md',
                resolve: {
                    orderDetails: function () {
                        return orderDetails;
                    }
                }
    
            });
        });

    }

    function validateInput() {    

        $scope.errorsFound = false;

        //city
        $scope.city_errorMessage = !$scope.order.city ? 'city  required' : '';
        $scope.errorsFound = $scope.city_errorMessage !== '' || $scope.errorsFound;

        //street
        $scope.street_errorMessage = !$scope.order.street ? 'street  required' : '';
        $scope.errorsFound = $scope.street_errorMessage !== '' || $scope.errorsFound;
        
        //delivery date
        $scope.delivery_date_errorMessage = !$scope.order.deliveryDate ? 'delivery date  required' : '';
        $scope.errorsFound = $scope.delivery_date_errorMessage !== '' || $scope.errorsFound;
        
        //credit card
        if ($scope.order.creditCard) {
            var ccRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
            var ccValid = ccRegex.test($scope.order.creditCard.replace(/\s/g, ''));
            $scope.creditCard_errorMessage = !ccValid  ? 'Invalid Credit Card' : '';
            $scope.errorsFound = !ccValid;
        }
        else {
            $scope.creditCard_errorMessage =   'Credit Card required';
            $scope.errorsFound = true;
        }
    }

    //datepicker functions start
    $scope.DatePicker = {
        opened: false
    };

    $scope.openDatePicker = function() {
        $scope.DatePicker.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.order.deliveryDate = new Date(year, month, day);
    };
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
        return mode === 'day' && 
            (filledDeliveryDates.indexOf(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()) >= 0);
    }
    //datepicker functions end

    $scope.editCreditCard = function() {  

        var ccIN = $scope.order.creditCard;
        var ccOUT = '';
        ccIN = ccIN.replace(/\s/g, '');
        for (var i=0; i < ccIN.length; i++) {
            if (i%4 == 0 && i > 0) {
                ccOUT = ccOUT.concat(' ');
            }
            ccOUT = ccOUT.concat(ccIN[i]);
        }
        $scope.order.creditCard = ccOUT;
    };

});
