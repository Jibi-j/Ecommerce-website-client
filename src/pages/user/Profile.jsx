import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import UserNavbar from "../../components/Usernavbar";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={`min-h-screen ${mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <UserNavbar />

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside
          className={`w-full lg:w-64 p-6 ${mode === "dark" ? "bg-gray-900" : "bg-pink-100"} flex-shrink-0`}
        >
          <h2 className="text-xl font-bold mb-6">My Account</h2>
          <nav className="flex flex-col space-y-4">
            <NavLink to="/dashboard/profile" className="hover:underline">My Profile</NavLink>
            <NavLink to="/dashboard/edit-profile" className="hover:underline">Edit Profile</NavLink>
            <NavLink to="/dashboard/orders" className="hover:underline">My Orders</NavLink>
            <NavLink to="/dashboard/review" className="hover:underline">My Reviews</NavLink>

            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline mt-6 text-left"
            >
              Logout
            </button>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-10">
          <h1 className="text-2xl font-bold mb-2">Welcome, {userData?.name} 🎉</h1>
          <p className="text-gray-800 dark:text-gray-400 break-words">Email: {userData?.email}</p>
        </main>
      </div>
    </div>
  );
};

export default Profile;

