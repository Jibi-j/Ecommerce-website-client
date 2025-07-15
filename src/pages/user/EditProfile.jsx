import React, { useState, useEffect } from "react";
import { api } from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        password: "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.patch("/user/update", formData, {
        withCredentials: true,
      });

      const updatedUser = res?.data?.data;
      const token = res?.data?.token;

      if (!updatedUser) throw new Error("No user data in response");

      const prevUser = JSON.parse(localStorage.getItem("userInfo")) || {};
      const userWithToken = {
        ...updatedUser,
        token: token || prevUser.token || "",
      };

      dispatch(saveUser(userWithToken));
      localStorage.setItem("userInfo", JSON.stringify(userWithToken));

      toast.success("Profile updated!");
      navigate("/dashboard/profile");
    } catch (err) {
     // console.error(" ERROR during profile update:", err);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-base-200 text-base-content rounded-lg shadow-md p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Edit Profile</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered w-full"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          className="input input-bordered w-full"
          value={formData.password}
          onChange={handleChange}
        />


        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default EditProfile;
