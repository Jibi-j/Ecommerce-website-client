import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  const reduxUser = useSelector((state) => state.user.userData);

  const localUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const user = reduxUser || localUser;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "seller") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default SellerProtectedRoute;
