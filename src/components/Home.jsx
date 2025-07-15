import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import womenImg from "../assets/women.png";
import menImg from "../assets/men.png";
import electronicsImg from "../assets/electronics.png";
import newcollectionImg from "../assets/newcollection.png"

const Home = () => {
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (user) {
      navigate(`/products/category/${category}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="bg-base-100 text-base-content w-full overflow-hidden transition-colors duration-300">
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-orange-500">
              Style Starts Here
            </h1>
            <p className="mb-6 text-lg sm:text-xl text-base-content/70">
              Discover the latest fashion trends
            </p>
            <Link to="/login">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full">
                Shop Now
              </button>
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="https://static.vecteezy.com/system/resources/previews/046/934/608/non_2x/shopping-girl-standing-on-transparent-background-free-png.png"
              alt="Hero"
              className="max-h-[600px] w-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-base-content">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-center text-center">
          <button
            onClick={() => handleCategoryClick("women")}
            className="flex flex-col items-center group"
          >
            <img
              src={womenImg}
              alt="Women"
              className="w-24 h-24 rounded-full object-cover shadow-md group-hover:scale-110 transition-transform"
            />
            <p className="mt-2 font-medium group-hover:text-orange-500">Women</p>
          </button>
          <button
            onClick={() => handleCategoryClick("men")}
            className="flex flex-col items-center group"
          >
            <img
              src={menImg}
              alt="Men"
              className="w-24 h-24 rounded-full object-cover shadow-md group-hover:scale-110 transition-transform"
            />
            <p className="mt-2 font-medium group-hover:text-orange-500">Men</p>
          </button>
          <button
            onClick={() => handleCategoryClick("electronics")}
            className="flex flex-col items-center group"
          >
            <img
              src={electronicsImg}
              alt="Electronics"
              className="w-24 h-24 rounded-full object-cover shadow-md group-hover:scale-110 transition-transform"
            />
            <p className="mt-2 font-medium group-hover:text-orange-500">Electronics</p>
          </button>
        </div>
      </div>

      <div className="w-full py-16 bg-base-100 text-base-content">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-orange-500">
              Get up to 30% Off
            </h2>
            <p className="text-lg mb-6 text-base-content/80">
              Explore the latest arrivals in our new collection.
            </p>
            <button
              onClick={() => {
                if (user) navigate("/products");
                else navigate("/login");
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full"
            >
              Explore Now
            </button>
          </div>

          <div className="flex justify-center">
            <img
              src={newcollectionImg}
              alt="New Collection"
              className="max-w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

    </div>











  );
};

export default Home;
