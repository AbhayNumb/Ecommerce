import "./App.css";
import Header from "./Components/Layout/Header/Header.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./Components/Layout/Footer/Footer.jsx";
function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanks"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
    </Router>
  );
}

export default App;
