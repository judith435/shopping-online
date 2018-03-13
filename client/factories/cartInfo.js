shoppingApp.factory("cartInfo", function() {
  var cartInfo = "";

  function addCartInfo(data) {
      cartInfo = data;
  }

  function getCartInfo() {
    return cartInfo;
  }

  return {
    addCartInfo,
    getCartInfo
  };

});