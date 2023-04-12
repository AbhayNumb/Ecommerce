import { Navigate } from "react-router-dom";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
const ProtectedRoute = ({ isAdmin, children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  
  // console.log(isAdmin === true && (user.role !== "admin" || user.role==undefined));
  if (isAdmin===false && (user.role !== "admin")) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
