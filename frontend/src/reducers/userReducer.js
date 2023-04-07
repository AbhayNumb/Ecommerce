import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  user: [],
};
export const userReducer = createReducer(initialState, {
  login_request: (state, action) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  login_success: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  login_fail: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.error = action.payload;
  },
  register_request: (state, action) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  register_success: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  register_fail: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.error = action.payload;
  },

  load_user_request: (state, action) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  load_user_success: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  load_user_fail: (state, action) => {
    state.loading = false;
    state.user = [];
    state.isAuthenticated = false;
    state.error = action.payload;
  },
  logout_success: (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  logout_fail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  clear_error: (state, action) => {
    state.error = null;
  },
});
export const profileReducer = createReducer(
  {},
  {
    update_profile_request: (state, action) => {
      state.loading = true;
    },
    update_profile_success: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    update_profile_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    update_profile_reset: (state, action) => {
      state.isUpdated = false;
    },
    clear_error: (state, action) => {
      state.error = null;
    },
  }
);
