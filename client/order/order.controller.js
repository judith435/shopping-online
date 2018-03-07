shoppingApp.controller("ctrlOrder", function signUp($scope, 
                                                    configSettings,
                                                    customerInfo,
                                                    cartInfo,
                                                    orderService,
                                                    $uibModal)   { 

    $scope.options  = configSettings.citiesList;
    const customer = customerInfo.getCustomerInfo();
    var filledDeliveryDates;

    orderService.getDeliveryDates(configSettings, function(response) {  
        if (response.data.status === "error") {
            alert("error occured - please contact support center");
            return;
        }
        alert (JSON.stringify(response.data.content));
        filledDeliveryDates = response.data.content.map((record) => record.deliveryDate);
    });


    $scope.inputDoubleClick = function(inputCtrl)  {
        if (inputCtrl.name === "city") {
            $scope.order.city = customer.city;
        }
        else {
            $scope.order.street = customer.street;
        }
    };

    //credit card validations start
    function luhnAlgorithm(cc, nCheck) {
        var nDigit = 0; 
        var bEven = false;
        
        cc = cc.replace(/\D/g, "");
    
        for (var n = cc.length - 1; n >= 0; n--) {
            let cDigit = cc.charAt(n);
            nDigit = parseInt(cDigit, 10);
    
            if (bEven) {
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9;
                } 
            }
    
            nCheck += nDigit;
            bEven = !bEven;
        }
        return nCheck;
    }
    
    function validateCC(cc) {
        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(cc)) {
            return false;
        } 
        var nCheck = 0; 
        return (luhnAlgorithm(cc, nCheck) % 10) === 0;
    }

    function ccValidation() {
        if ($scope.order.creditCard) {
            var creditCard = $scope.order.creditCard.replace(/\s/g, "");
            var ccRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
            var ccValid = ccRegex.test(creditCard);
            if (ccValid) {
                ccValid =  validateCC(creditCard);
            }
            $scope.creditCardErrorMessage = !ccValid  ? "Invalid Credit Card" : "";
            $scope.errorsFound = !ccValid || $scope.errorsFound;
        }
        else {
            $scope.creditCardErrorMessage = "credit card required";
            $scope.errorsFound = true;
        }
    }
    //credit card validations end

    function validateInput() {    

        $scope.errorsFound = false;

        //city
        $scope.cityErrorMessage = !$scope.order.city ? "city required" : "";
        $scope.errorsFound = $scope.cityErrorMessage !== "" || $scope.errorsFound;

        //street
        $scope.streetErrorMessage = !$scope.order.street ? "street required" : "";
        $scope.errorsFound = $scope.streetErrorMessage !== "" || $scope.errorsFound;
        
        //delivery date
        $scope.deliveryDateErrorMessage = !$scope.order.deliveryDate ? "delivery date required" : "";
        $scope.errorsFound = $scope.deliveryDateErrorMessage !== "" || $scope.errorsFound;
        
        //credit card
        ccValidation();
    }

    $scope.order = function()  {

        validateInput();
        //if ($scope.errorsFound) { return; }

        let cartDetails = cartInfo.getCartInfo(); 
        let deliveryDateTemp = "";
        if ($scope.order.deliveryDate) {
            deliveryDateTemp =  $scope.order.deliveryDate.getFullYear() + "-" +
            ($scope.order.deliveryDate.getMonth() + 1) + "-" +
            $scope.order.deliveryDate.getDate();
        }

        let order = new Order({ customer: customer.teudatZehut,
                                shoppingCart: cartDetails.id,
                                price: cartDetails.cartTotal,
                                deliveryCity: $scope.order.city,
                                deliveryStreet: $scope.order.street,
                                deliveryDate: deliveryDateTemp,
                                ccInfo: $scope.order.creditCard ? //remove separating spaces if cc not empty
                                        $scope.order.creditCard.replace(/\s/g, "") : $scope.order.creditCard});
        orderService.addOrder(configSettings, order, function(response) {  
            if (response.data.status === "error") {
                alert("error occured - please contact support center");
                return;
            }
            if (response.data.status === "invalid input") {
                alert(response.data.content);
                return;
            }

            var orderDetails = [];
            orderDetails.push(customer);
            orderDetails.push(cartDetails);

            //after successfull save of order dispay order popup
            var confirmationDialog = $uibModal.open({
                templateUrl: "order/orderConfirmation.html",
                controller: "orderConfirmationController",
                size: "md",
                resolve: {
                    orderDetails () {
                        return orderDetails;
                    }
                }
            });
        });
    };

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
    $scope.format = "dd/MM/yyyy";

    // Disable days with more than 3 orders
    function disabled(data) {
        let date = data.date, mode = data.mode;
        return mode === "day" && 
            (filledDeliveryDates.indexOf( date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()) >= 0);
    }

    $scope.dateOptions = {
        dateDisabled: disabled,
        maxDate: new Date().setMonth(new Date().getMonth() + 2),
        minDate: new Date(),
        startingDay: 7
    };
    //datepicker functions end

    $scope.editCreditCard = function() {  

        var ccIN = $scope.order.creditCard;
        var ccOUT = "";
        ccIN = ccIN.replace(/\s/g, "");
        for (var i=0; i < ccIN.length; i++) {
            if (i%4 === 0 && i > 0) {
                ccOUT = ccOUT.concat(" ");
            }
            ccOUT = ccOUT.concat(ccIN[i]);
        }
        $scope.order.creditCard = ccOUT;
    };

});
