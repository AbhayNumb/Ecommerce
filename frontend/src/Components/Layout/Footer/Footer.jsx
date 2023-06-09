import React from "react";
import playStore from "../../../Images/playstore.png";
import appStore from "../../../Images/Appstore.png";
import "./Footer.css";
function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>We don't just sell products, we sell quality</p>

        <p>Copyrights 2023 &copy; Abhay</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/abhaylovesjava/" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://twitter.com/abhayptsr" target="_blank" rel="noreferrer">Twitter</a>
        <a href="https://www.facebook.com/abhaypratap.srivastava.7/" target="_blank" rel="noreferrer">Facebook</a>
      </div>
    </footer>
  );
}

export default Footer;
