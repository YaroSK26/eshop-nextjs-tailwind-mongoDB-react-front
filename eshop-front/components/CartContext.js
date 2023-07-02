/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});
export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const ls = window.localStorage;
    const cartData = ls.getItem("cart");

    if (cartData) {
      setCartProducts(JSON.parse(cartData));
    }
  }, []);

  useEffect(() => {
    const ls = window.localStorage;
    ls.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts]);

  
  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }
  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }
  function clearCart() {
    setCartProducts([]);
    ls?.removeItem("cart");
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        clearCart,
        removeProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
