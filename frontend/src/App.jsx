import "./App.css";
import { useState } from "react";
import Header from "./Components/Layout/Header/Header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./Components/Layout/Footer/Footer.jsx";
import Home from "./Components/Home/Home.jsx";
import ProductDetails from "./Components/Product/ProductDetails.jsx";
import Products from "./Components/Product/Products.jsx";
import Search from "./Components/Product/Search.jsx";
import LoginSignUp from "./Components/User/LoginSignUp.jsx";
import store from "./store";
import { loaduser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./Components/Layout/Header/UserOptions.jsx";
import Profile from "./Components/User/Profile.jsx";
import ProtectedRoute from "./Components/Route/ProtectedRoute.jsx";
import UpdateProfile from "./Components/User/UpdateProfile.jsx";
import UpdatePassword from "./Components/User/UpdatePassword.jsx";
import ForgotPassword from "./Components/User/ForgotPassword.jsx";
import ResetPassword from "./Components/User/ResetPassword.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Shipping from "./Components/Cart/Shipping.jsx";
import ConfirmOrder from "./Components/Cart/ConfirmOrder.jsx";
import Payment from "./Components/Cart/Payment.jsx";
import OrderSuccess from "./Components/Cart/OrderSuccess.jsx";
import MyOrders from "./Components/Order/MyOrders.jsx";
import axios from "axios";
import StripeLayout from "./Components/Route/StripeLayout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderDetails from "./Components/Order/OrderDetails.jsx";
import DashBoard from "./Components/admin/DashBoard.jsx";
import ProductList from './Components/admin/ProductList.jsx'
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanks"],
      },
    });
    store.dispatch(loaduser());
    getStripeApiKey();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user}></UserOptions>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        {/* <Route path="/account" element={<Profile />} /> */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        <Route element={<StripeLayout {...{ stripeApiKey }} />}>
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        </Route>
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route path="/Cart" element={<Cart />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/search" element={<Search />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<LoginSignUp />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
