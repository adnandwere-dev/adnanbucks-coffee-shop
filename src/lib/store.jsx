"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartReady, setIsCartReady] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
    const savedCart = localStorage.getItem("adnanbucks_cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        localStorage.removeItem("adnanbucks_cart");
      }
    }

    setIsCartReady(true);
  }, 0);

  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
    if (!isCartReady) return;

    localStorage.setItem("adnanbucks_cart", JSON.stringify(cart));
  }, [cart, isCartReady]);

  const addToCart = (newItem) => {
    setCart((previousCart) => {
      const existingIndex = previousCart.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingIndex >= 0) {
        const updatedCart = [...previousCart];

        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + newItem.quantity,
        };

        return updatedCart;
      }

      return [...previousCart, newItem];
    });
  };

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <AppContext.Provider
      value={{
        cart,
        isCartReady,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}