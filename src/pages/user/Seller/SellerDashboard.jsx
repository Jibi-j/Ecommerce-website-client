import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/userSlice";
import { api } from "../../../config/axiosInstance";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";

const SellerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 md:hidden bg-blue-100 text-black shadow">
        <h2 className="text-lg font-bold">Seller Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 bg-blue-100 text-black p-6 transition-all duration-300 md:block ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        <h2 className="text-xl font-bold mb-6 hidden md:block">Seller Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink to="profile" onClick={() => setSidebarOpen(false)}>
            Profile
          </NavLink>
          <NavLink to="create-product" onClick={() => setSidebarOpen(false)}>
            Create Product
          </NavLink>
          <NavLink to="products" onClick={() => setSidebarOpen(false)}>
            My Products
          </NavLink>
          <NavLink to="orders" onClick={() => setSidebarOpen(false)}>
            Order Details
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-left text-red-600 mt-6"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white text-black">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerDashboard;

