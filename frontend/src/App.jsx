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
function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanks"],
      },
    });
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
