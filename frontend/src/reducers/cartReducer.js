import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};
export const cartReducer = createReducer(initialState, {
  add_to_cart: (state, action) => {
    const item = action.payload;
    console.log(item);
    const doesItemExist = state.cartItems.find(
      (i) => i.product === item.product
    );
    console.log(doesItemExist);
    if (doesItemExist) {
      state.cartItems = state.cartItems.map((i) =>
        i.product === doesItemExist.product ? item : i
      );
    } else {
      state.cartItems = [...state.cartItems, item];
    }
  },
  remove_cart_item: (state, action) => {
    state.cartItems = state.cartItems.filter(
      (i) => i.product !== action.payload
    );
  },
});
