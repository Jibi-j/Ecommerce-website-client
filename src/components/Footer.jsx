import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Footer = () => {
  const theme = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.user.userData);
  const isDark = theme === "dark";
  const navigate = useNavigate();

  const handleProtectedNav = (category) => {
    if (user) {
      navigate(`/products/category/${category}`);
    } else {
      toast.warn("Please login to access products");
    }
  };

  return (
    <footer className={`mt-12 ${isDark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 grid-cols-1 sm:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className={`space-y-2 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
            <li><Link to="/login" className="hover:text-yellow-400">Login</Link></li>
            <li><Link to="/seller/become" className="hover:text-yellow-400">Become a Seller</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop by Category</h3>
          <ul className={`space-y-2 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <li><button onClick={() => handleProtectedNav("men")} className="hover:text-yellow-500">Men</button></li>
            <li><button onClick={() => handleProtectedNav("women")} className="hover:text-yellow-500">Women</button></li>
            <li><button onClick={() => handleProtectedNav("electronics")} className="hover:text-yellow-500">Electronics</button></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className={`space-y-2 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            <li>Email: hellotrends@gmail.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: Kochi, India</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl mb-6">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400">
              <FaTwitter />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="hover:text-green-600">
              <FaWhatsapp />
            </a>
          </div>
          </div>
          </div>

      <div className={`text-center text-sm py-4 border-t ${isDark ? "border-gray-700 text-gray-500" : "border-gray-300 text-gray-500"}`}>
        &copy; {new Date().getFullYear()} Trends. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
