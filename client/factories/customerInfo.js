shoppingApp.factory("customerInfo", function() {  
    var customerInfo = "";
  
    function addCustomerInfo(data) {
        customerInfo = data;
    }
  
    function getCustomerInfo() {
      return customerInfo;
    }
  
    return {
      addCustomerInfo,
      getCustomerInfo
    };

  });