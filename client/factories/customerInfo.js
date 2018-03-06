shoppingApp.factory("customerInfo", function() {  
    var customerInfo = "";
  
    return {
      addCustomerInfo: addCustomerInfo,
      getCustomerInfo: getCustomerInfo
    };
  
    function addCustomerInfo(data) {
        customerInfo = data;
    }
  
    function getCustomerInfo() {
      return customerInfo;
    }
  });