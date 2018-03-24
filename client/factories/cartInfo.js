shoppingApp.factory("cartInfo", function() {

  function addCartInfo(cart) {
    sessionStorage.setItem("cart", JSON.stringify(cart));   
  }

  function getCartInfo() {
    var cart = sessionStorage.getItem("cart");
    return JSON.parse(cart);
  }

  function deleteCartInfo() {
    sessionStorage.removeItem("cart");
  }

  return {
    addCartInfo,
    getCartInfo,
    deleteCartInfo
  };

});