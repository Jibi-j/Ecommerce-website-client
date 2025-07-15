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

      <div className="flex min-h-screen">
        <aside className={`${mode === "dark" ? "bg-gray-900" : "bg-pink-100"} w-64 p-6`}>
          <h2 className="text-xl font-bold mb-6">My Account</h2>
          <nav className="flex flex-col space-y-4">
            <NavLink to="/dashboard/profile">My Profile</NavLink>
            <NavLink to="/dashboard/edit-profile">Edit Profile</NavLink>
            <NavLink to="/dashboard/orders">My Orders</NavLink>
            <NavLink to="/dashboard/review">My Reviews</NavLink>

            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline mt-6 text-left"
            >
              Logout
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-10">
          <h1 className="text-2xl font-bold mb-2">Welcome, {userData?.name} 🎉</h1>
          <p className="text-gray-800 dark:text-gray-600">Email: {userData?.email}</p>
        </main>
      </div>
    </div>
  );
};

export default Profile;
