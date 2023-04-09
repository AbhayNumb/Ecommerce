import { createReducer } from "@reduxjs/toolkit";

export const newOrderReducer = createReducer(
  {},
  {
    create_order_request: (state, action) => {
      state.loading = true;
    },
    create_order_success: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    create_order_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear_error: (state, action) => {
      state.error = null;
    },
  }
);
