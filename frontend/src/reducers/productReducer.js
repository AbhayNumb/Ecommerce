import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  products: [],
};
export const customReducer = createReducer(initialState, {
  all_product_request: (state, action) => {
    state.products = [];
    state.loading = true;
  },
  all_product_success: (state, action) => {
    state.products = action.payload.products;
    state.loading = false;
    state.productsCount = action.payload.productsCount;
  },
  all_product_fail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clear_error: (state, action) => {
    state.products = action.payload.products;
    state.error = null;
  },
});
