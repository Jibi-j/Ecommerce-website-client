import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const About = () => {
  const isDark = useSelector((state) => state.theme.mode === "dark");

  return (
    <div className={`min-h-screen py-10 px-6 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Trends</h1>

        <p className="text-lg leading-7">
          Welcome to <strong>Trends</strong>, your go-to online shopping destination for stylish fashion,
          electronics, and everyday essentials. We believe in delivering high-quality products at
          affordable prices with fast shipping and excellent customer service.
        </p>

        <p className="mt-4 text-lg leading-7">
          Whether you're looking for the latest in men's and women's fashion, modern gadgets, or
          lifestyle accessories, Trends has something for everyone. We are committed to offering a
          seamless and secure shopping experience.
        </p>

        <p className="mt-4 text-lg leading-7">
          Thank you for choosing Trends — where quality meets convenience.
        </p>
        
        <div className="mt-8">
          <Link
            to="/"
            className={`inline-block px-6 py-2 rounded-md font-medium transition ${
              isDark
                ? "bg-yellow-500 text-black hover:bg-yellow-600"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
             Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
