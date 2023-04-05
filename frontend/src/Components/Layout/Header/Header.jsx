import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../Images/logo.png";
import {FaUserCircle,FaSearch,FaShoppingCart} from "react-icons/fa"

const options = {
  burgerColorHover: "#e4815d",
  logo,
  logoWidth: "20vmax",
  navColor1: "#fffaf6",
  logoHoverSize: "10px",
  logoHoverColor: "#e4815d",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "#424246",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#e4815d",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIcon:true,
  searchIcon:true,
  cartIcon:true,
  CartIconElement:FaShoppingCart,
  SearchIconElement:FaSearch,
  ProfileIconElement:FaUserCircle,
  profileIconColorHover: "#e4815d",
  searchIconColorHover: "#e4815d",
  cartIconColorHover: "#e4815d",
  cartIconMargin: "1vmax",
};
function Header() {
  return (
    <>
      <ReactNavbar {...options} />
    </>
  );
}

export default Header;
