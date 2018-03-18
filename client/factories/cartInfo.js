shoppingApp.factory("cartInfo", function() {

  function addCartInfo(cart) {
    sessionStorage.setItem("cart", JSON.stringify(cart));   
  }

  function getCartInfo() {
    var cart = sessionStorage.getItem("cart");
    return JSON.parse(cart);
  }

  return {
    addCartInfo,
    getCartInfo
  };

});