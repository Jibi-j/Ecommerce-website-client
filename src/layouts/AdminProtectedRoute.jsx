import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  //console.log(" AdminProtectedRoute user:", user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default AdminProtectedRoute;
