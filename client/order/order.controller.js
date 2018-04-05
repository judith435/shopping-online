shoppingApp.controller("order", function signUp($scope, 
                                                $window,
                                                $routeParams, 
                                                configSettings,
                                                customerInfo,
                                                cartInfo,
                                                orderService,
                                                $location,
                                                $uibModal)   { 
    //cartStatus parm not present in url => customer attempted to access order page directly (not via order link on shopping page)
    if (!$routeParams.cartStatus) {
        alert("attempt to handle order directly bypassing shopping panel");
        $location.path("/home");
    }

    $scope.options  = configSettings.citiesList;
    const customer = customerInfo.getCustomerInfo();
    //test if browser firefox or edge: ng-dblclick does not work on city select  => set select to customer's 
    //city on page load 
    if ($window.navigator.userAgent.includes("Edge") || $window.navigator.userAgent.includes("Firefox") ) {
        $scope.city = customer.city;
        alert("in select browser handling");
    }

    //delivery dates with 3 scheduled deliveries - cannot place any more orders - dates disabled in calendar 
    var filledDeliveryDates; 
    $scope.showErrorMessages = false;

    //*******************************************************************************************************
    //get dates with 3 scheduled deliveries
    //*******************************************************************************************************
    orderService.getDeliveryDates(configSettings, function(response) {  
        if (response.data.status === "error") {
            alert("error occured - please contact support center");
            return;
        }

        if (response.data.status === "forbiddenAccessAttempted" ) {
            return;
        }
        filledDeliveryDates = response.data.content.map((record) => record.deliveryDate);
    });

    //*******************************************************************************************************
    //handle double click event on city and street input fields 
    //*******************************************************************************************************
    $scope.inputDoubleClick = function(inputCtrl)  {
        if (inputCtrl.name === "city") {
            $scope.city = customer.city;
        }
        else {
            $scope.order.street = customer.street;
        }
    };

    //*******************************************************************************************************
    //order button click handling (including credit card validation using Luhn algorithm)
    //*******************************************************************************************************
    function luhnAlgorithm(cc, nCheck) { //used to check credit card
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

    function validateInput() {  

        if ($scope.order.creditCard) {
            var creditCard = $scope.order.creditCard.replace(/\s/g, "");
            var ccRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
            var ccValid = ccRegex.test(creditCard);
            ccValid =  validateCC(creditCard);
            $scope.creditCardErrorMessage = !ccValid  ? "Invalid Credit Card" : "";
            return;
        }
        //field left empty
        $scope.creditCardErrorMessage = "credit card required";
    }

    $scope.order = function()  {

        $scope.showErrorMessages = false;

        validateInput();
        if ($scope.formOrder.$invalid || $scope.creditCardErrorMessage) {
            $scope.showErrorMessages = true;
            return; 
        }

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
                                deliveryCity: $scope.city,
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

            var orderDetails = []; //used to pass data to order confirmation popup
            orderDetails.push(customer);
            orderDetails.push(cartDetails);

            //after successfull save of order dispay order popup
            var confirmationDialog = $uibModal.open({
                templateUrl: "order/orderConfirmation.html",
                controller: "orderConfirmation",
                size: "md",
                resolve: {
                    orderDetails () {
                        return orderDetails;
                    }
                }
            });
        });
    };

    //*******************************************************************************************************
    //datepicker functions
    //*******************************************************************************************************
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
    function disableDate(data) {
        let date = data.date, mode = data.mode;
        return mode === "day" && 
            (filledDeliveryDates.indexOf( date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()) >= 0);
    }

    $scope.dateOptions = {
        dateDisabled: disableDate,
        maxDate: new Date().setMonth(new Date().getMonth() + 2),
        minDate: new Date(),
        startingDay: 7
    };
    
    //*******************************************************************************************************
    //credit card input ng-keyup event 
    //*******************************************************************************************************
    $scope.editCreditCard = function() {  
        if ($scope.order.creditCard) {
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
        }
    };
});
