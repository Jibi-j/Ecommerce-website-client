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
    <header
      className={`w-full shadow px-4 py-3 flex flex-wrap justify-between items-center ${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center space-x-4 mb-2 md:mb-0">
        <Link to="/" className="font-medium text-lg hover:underline">
          Home
        </Link>
      </div>

      <h1 className="text-lg md:text-xl font-semibold text-center flex-1 md:flex-none md:mr-6">
        Dashboard
      </h1>

      <div className="flex items-center space-x-4">
        <button onClick={() => dispatch(toggleTheme())} aria-label="Toggle Theme">
          {mode === "dark" ? (
            <FaSun className="text-yellow-400 text-lg" />
          ) : (
            <FaMoon className="text-gray-700 text-lg" />
          )}
        </button>

        {userData && (
          <Link to="/dashboard" className="text-xl hover:text-green-500">
            <FaUserCircle />
          </Link>
        )}

        <Link to="/cart" className="text-xl hover:text-green-500">
          <FaShoppingCart />
        </Link>
      </div>
    </header>
  );
};

export default UserNavbar;
