import { configureStore } from "@reduxjs/toolkit";
import {
  newReviewReducer,
  productDetailsReducer,
  productReducer,
} from "./reducers/productReducer";
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
} from "./reducers/orderReducer";
const store = configureStore({
  reducer: {
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
  },
});
export default store;
