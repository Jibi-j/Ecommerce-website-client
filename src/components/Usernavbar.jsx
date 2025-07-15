import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";

const UserNavbar = () => {
  const { userData } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <header className={`shadow p-4 flex justify-between items-center ${mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="flex items-center space-x-4">
        <Link to="/" className="font-medium">
          Home
        </Link>
      </div>

      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center space-x-4">
        <button onClick={() => dispatch(toggleTheme())}>
          {mode === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
        </button>

        {userData && (
          <Link to="/dashboard" className="hover:text-primary text-xl">
            <FaUserCircle />
          </Link>
        )}

        <Link to="/cart" className="hover:text-primary text-xl">
          <FaShoppingCart />
        </Link>
      </div>
    </header>
  );
};

export default UserNavbar;
