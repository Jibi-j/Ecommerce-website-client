import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";

const UserNavbar = () => {
  const { userData } = useSelector((state) => state.user);
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={`shadow ${mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-semibold hover:underline">
          Home
        </Link>

        <h1 className="hidden md:block text-xl font-semibold">Dashboard</h1>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={() => dispatch(toggleTheme())}>
            {mode === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
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

        <button className="md:hidden text-xl" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link to="/dashboard" className="block" onClick={toggleMenu}>
            Dashboard
          </Link>
          <Link to="/cart" className="block" onClick={toggleMenu}>
            Cart
          </Link>
          <button onClick={() => { dispatch(toggleTheme()); toggleMenu(); }} className="block">
            {mode === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </header>
  );
};

export default UserNavbar;
