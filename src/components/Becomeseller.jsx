import React from "react";
import { useNavigate } from "react-router-dom";

const BecomeSeller = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-100 text-base-content p-8">
      <h1 className="text-4xl font-bold mb-4">Sell with Trends</h1>
      <p className="max-w-xl text-center mb-6 opacity-70">
        Reach millions of customers and grow your business by selling your products on our platform.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/seller/signup")}
          className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
        >
          Sign Up as Seller
        </button>
        <button
          onClick={() => navigate("/seller/login")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Seller Login
        </button>
      </div>
    </div>
  );
};

export default BecomeSeller;

