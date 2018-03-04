shoppingApp.factory('cartInfo', function() {
    var cartInfo = '';
  
    return {
      addCartInfo: addCartInfo,
      getCartInfo: getCartInfo
    };
  
    function addCartInfo(data) {
        cartInfo = data;
    }
  
    function getCartInfo() {
      return cartInfo;
    }
  });