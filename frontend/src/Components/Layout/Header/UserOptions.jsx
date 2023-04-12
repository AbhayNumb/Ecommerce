import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import "./Header.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import { Backdrop } from "@material-ui/core";
import { useSelector } from "react-redux";
const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "#e4815d" : "unset" }}
        />
      ),
      name: `Cart${cartItems.length}`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function cart() {
    navigate("/Cart");
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    // navigate("/logoutUser");
    dispatch(logout());
    alert.success("Logout Successfully");
    console.log("HI");
    navigate("/login");
  }
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
            style={{ objectFit: "cover" }}
          />
        }
      >
        {options.map((item, idx) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
