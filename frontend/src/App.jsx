import "./App.css";
import Header from "./Components/Layout/Header/Header.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./Components/Layout/Footer/Footer.jsx";
import Home from "./Components/Home/Home.jsx";
import Loader from "./Components/Layout/Loader/Loader";

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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
