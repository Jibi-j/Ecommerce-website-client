import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { userData } = useSelector((state) => state.user);

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  if (userData.role === "customer") {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;

