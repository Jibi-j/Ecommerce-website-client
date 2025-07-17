import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../config/axiosInstance";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = async () => {
    try {
      await api.post("/admin/logout"); 
      localStorage.removeItem("userInfo");
      toast.success("Admin logged out");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-pink-100 text-black p-6">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        <p className="text-sm text-gray-700 mb-6">Hi, {user?.name}</p>

        <ul className="space-y-4">
          <li>
            <Link to="products" className="hover:text-blue-600">
              Manage Products
            </Link>
          </li>
          <li>
            <Link to="users" className="hover:text-blue-600">
              Manage Users
            </Link>
          </li>
          <li>
            <Link to="orders" className="hover:text-blue-600">
              Admin Orders
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline mt-4"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

