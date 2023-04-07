import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  loading: true,
};
export const productReducer = createReducer(initialState, {
  all_product_request: (state, action) => {
    state.products = [];
    state.loading = true;
  },
  all_product_success: (state, action) => {
    state.products = action.payload.products;
    state.loading = false;
    state.productsCount = action.payload.productcount;
    state.resultperpage = action.payload.resultperpage;
    state.filteredProductsCount = action.payload.filteredProductsCount;
  },
  all_product_fail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clear_error: (state, action) => {
    state.error = null;
  },
});
export const productDetailsReducer = createReducer(initialState, {
  product_details_request: (state, action) => {
    state.loading = true;
  },
  product_details_success: (state, action) => {
    state.product = action.payload;
    state.loading = false;
  },
  product_details_fail: (state, action) => {
    state.loading = true;
    state.error = action.payload;
  },
  clear_error: (state, action) => {
    state.error = null;
  },
});
