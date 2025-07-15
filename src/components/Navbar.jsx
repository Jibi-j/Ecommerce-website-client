import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBars, FaTimes, FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { logout } from "../redux/slices/userSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userData);
  const theme = useSelector((state) => state.theme.mode);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/login");
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-base-100 shadow-md px-4 py-3 flex justify-between items-center relative z-50">
      <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-yellow-600">
        Trends
        <img
          src="https://cdn-icons-png.flaticon.com/512/9149/9149134.png"
          alt="Trends Logo"
          className="w-8 h-8"
        />
      </Link>

      <div className="sm:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      <div className="hidden sm:flex items-center space-x-6">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1 font-medium hover:text-yellow-400"
          >
            <FaUser />
            {user ? "My Account" : "Login"}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white shadow-md border rounded z-10">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Existing User
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    New Customer
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <Link to="/cart" className="flex items-center gap-1 hover:text-yellow-400">
          <FaShoppingCart /> Cart
        </Link>

        <Link to="/seller/become" className="hover:text-yellow-400">
          Become a Seller
        </Link>

        <button onClick={handleThemeToggle} className="text-xl hover:text-yellow-400">
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>

    
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-base-100 shadow-md flex flex-col items-start space-y-3 py-4 px-6 sm:hidden">
          <Link to="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
            <FaUser /> {user ? "My Account" : "Login"}
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
            <FaShoppingCart /> Cart
          </Link>

          <Link
            to="/seller/become"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2"
          >
            Become a Seller
          </Link>

          <button onClick={handleThemeToggle} className="flex items-center gap-2">
            {theme === "light" ? <FaMoon /> : <FaSun />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
