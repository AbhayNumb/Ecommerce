import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  products: [],
  loading: true,
};
export const productsReducer = createReducer(initialState, {
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

  admin_product_request: (state, action) => {
    state.products = [];
    state.loading = true;
  },
  admin_product_success: (state, action) => {
    state.products = action.payload.products;
    state.loading = false;
  },
  admin_product_fail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clear_error: (state, action) => {
    state.error = null;
  },
});
// product Details
export const productDetailsReducer = createReducer(initialState, {
  product_details_request: (state, action) => {
    state.loading = true;
  },
  product_details_success: (state, action) => {
    state.product = action.payload;
    state.loading = false;
  },
  product_details_fail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  makeEmpty:(state,action)=>{
    state.product=[]
  },
  clear_error: (state, action) => {
    state.error = null;
  },
});

//new Review Reducer
export const newReviewReducer = createReducer(
  {},
  {
    new_review_request: (state, action) => {
      state.loading = true;
      state.success = undefined;
    },
    new_review_success: (state, action) => {
      state.success = action.payload;
      state.loading = false;
    },
    new_review_fail: (state, action) => {
      state.loading = false;
      state.success = undefined;
      state.error = action.payload;
    },
    new_review_reset: (state, action) => {
      state.loading = false;
      state.success = undefined;
      state.error = action.payload;
    },
    clear_error: (state, action) => {
      state.error = null;
    },
  }
);

export const newProductReducer = createReducer(
  { product: {} },
  {
    new_product_request: (state, action) => {
      state.loading = true;
      state.product = {};
      state.success = undefined;
    },
    new_product_success: (state, action) => {
      state.success = action.payload.success;
      state.product = action.payload.product;
      state.loading = false;
    },
    new_product_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    new_product_reset: (state, action) => {
      state.loading = false;
      state.success = undefined;
      state.error = action.payload;
    },
    clear_error: (state, action) => {
      state.error = null;
    },
  }
);

export const productReducer = createReducer(
  {},
  {
    delete_product_request: (state, action) => {
      state.loading = true;
    },
    delete_product_success: (state, action) => {
      state.isDeleted = action.payload;
      state.loading = false;
    },
    delete_product_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    delete_product_reset: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
    },
    update_product_request: (state, action) => {
      state.loading = true;
    },
    update_product_success: (state, action) => {
      state.isUpdated = action.payload;
      state.loading = false;
    },
    update_product_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    update_product_reset: (state, action) => {
      state.loading = false;
      state.isUpdated = false;
    },
    clear_error: (state, action) => {
      state.error = null;
    },
  }
);