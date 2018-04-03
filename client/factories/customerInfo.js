shoppingApp.factory("customerInfo", function() { //used to pass customer data between controllers
  
    function addCustomerInfo(customer) {
        sessionStorage.setItem("customer", JSON.stringify(customer));   
    }
  
    function getCustomerInfo() {
      var customer = sessionStorage.getItem("customer");
      return JSON.parse(customer);
    }
  
    return {
      addCustomerInfo,
      getCustomerInfo
    };

  });