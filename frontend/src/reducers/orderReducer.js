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
export const myOrdersReducer = createReducer(
  { orders: [] },
  {
    my_order_request: (state, action) => {
      state.loading = true;
    },
    my_order_success: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    my_order_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear_error: (state, action) => {
      state.error = null;
    },
  }
);
export const orderDetailsReducer = createReducer(
  { order: [] },
  {
    order_details_request: (state, action) => {
      state.loading = true;
    },
    order_details_success: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    order_details_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear_error: (state, action) => {
      state.error = null;
    },
  }
);

export const allOrdersReducer = createReducer(
  { orders: [] },
  {
    all_order_request: (state, action) => {
      state.loading = true;
    },
    all_order_success: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    all_order_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear_error: (state, action) => {
      state.error = null;
    },
  }
);
export const orderReducer = createReducer(
  { orders: [] },
  {
    update_order_request: (state, action) => {
      state.loading = true;
    },
    update_order_success: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },

    update_order_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    update_order_reset: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    },
    delete_order_request: (state, action) => {
      state.loading = true;
    },
    delete_order_success: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload;
    },
    delete_order_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    delete_order_reset: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
    },
    clear_error: (state, action) => {
      state.error = null;
    },
  }
);
