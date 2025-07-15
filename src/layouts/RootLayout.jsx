import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content transition-colors duration-300">
      <Navbar />

      <ToastContainer position="top-right" autoClose={3000} />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;



