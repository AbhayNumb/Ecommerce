import { configureStore } from "@reduxjs/toolkit";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
} from "./reducers/productReducer";
import {
  allUsersReducers,
  forgotPasswordReducer,
  profileReducer,
  userReducer,
  usersDetailsReducers,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";
const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducers,
    userDetails: usersDetailsReducers,
  },
});
export default store;
