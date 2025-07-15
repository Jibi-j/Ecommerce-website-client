import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import UserNavbar from "../../components/Usernavbar";

const UserDashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <UserNavbar />
      <div className="flex">
        <aside className="w-64 bg-gray-100 p-6">
          <h2 className="text-xl font-bold mb-6">My Account</h2>
          <nav className="flex flex-col space-y-4">
            <NavLink to="profile">My Profile</NavLink>
            <NavLink to="edit-profile">Edit Profile</NavLink>
            <NavLink to="orders">My Orders</NavLink>
            <NavLink to="reviews">My Reviews</NavLink>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline mt-6 text-left"
            >
              Logout
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
