import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../config/axiosInstance";
import { toast } from "react-toastify";

const Signup = ({ isSellerDefault = false }) => {
  const navigate = useNavigate();
  const [isSeller] = useState(isSellerDefault);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",

  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSeller ? "/seller/register" : "/user/register";

    try {
      const res = await api.post(endpoint, form);
      toast.success(res.data.message || "Registration successful");
      navigate(isSeller ? "/seller/login" : "/login");
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-base-100 text-base-content shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isSeller ? "Seller Signup" : "User Signup"}
      </h2>
  
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded placeholder:text-base-content text-base-content"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded placeholder:text-base-content text-base-content"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded placeholder:text-base-content text-base-content"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
