import { createContext, useEffect, useReducer } from "react";
import { ACTIONS, EditData, DeleteData } from "./Actions";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_CART:
      return [...action.payload];
    case ACTIONS.UPDATE_CART:
      return EditData(state, action.payload._id, action.payload);
    case ACTIONS.DELETE_CART:
      return DeleteData(state, action.payload);
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = [];

  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // get cart data from LocalStorage
  useEffect(() => {
    const __next__cart__koikko = JSON.parse(
      localStorage.getItem("__next__cart__koikko")
    );

    if (__next__cart__koikko)
      dispatch({ type: ACTIONS.ADD_CART, payload: __next__cart__koikko });
  }, []);

  // save cart data to LocalStorage when cart state is updated
  useEffect(() => {
    if (cart !== initialState) {
      localStorage.setItem("__next__cart__koikko", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
