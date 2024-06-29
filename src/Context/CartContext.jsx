import React, { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log("ADD_TO_CART action:", action);
      const itemExists = state.find((item) => item.id === action.payload.id);
      if (itemExists) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: action.payload.quantity }];
    case "UPDATE_QUANTITY":
      console.log("UPDATE_QUANTITY action:", action);
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case "REMOVE_FROM_CART":
      console.log("REMOVE_FROM_CART action:", action);
      return state.filter(item => item.id !== action.payload.id);
    case "CLEAR_CART":
      console.log("CLEAR_CART action:", action);
      return [];
    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const localData = localStorage.getItem("cart");
    try {
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error parsing cart data from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    console.log("Updating localStorage with cart:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);