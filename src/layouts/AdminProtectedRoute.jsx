import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  if (
    user.role !== "admin" ||
    user.email !== "admin123@gmail.com"
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminProtectedRoute;

