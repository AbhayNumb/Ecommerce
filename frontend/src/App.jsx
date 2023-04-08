import "./App.css";
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
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanks"],
      },
    });
    store.dispatch(loaduser());
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
