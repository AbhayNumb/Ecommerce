import { configureStore } from "@reduxjs/toolkit";
import { customReducer } from "./reducers/productReducer";
const store = configureStore({
  reducer: {
    products: customReducer,
  },
});
export default store;
