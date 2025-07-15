import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";
import { api } from "../../../config/axiosInstance";
import { toast } from "react-toastify";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/seller/logout");
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex min-h-screen text-black">
      <aside className="w-64 bg-blue-100 p-6">
        <h2 className="text-xl font-bold mb-4">Seller Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink to="profile">Profile</NavLink>
          <NavLink to="create-product">Create Product</NavLink>
          <NavLink to="products">My Products</NavLink>
          <NavLink to="orders">Order Details</NavLink>

          <button
            onClick={handleLogout}
            className="text-left text-red-600 "
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerDashboard;

