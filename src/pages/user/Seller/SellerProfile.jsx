import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../../../config/axiosInstance";
import { saveUser } from "../../../redux/slices/userSlice";

const SellerProfile = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    newPassword: "", 
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/seller/update-profile", form);
      dispatch(saveUser({ ...userData, ...res.data.data }));
      alert("Profile updated successfully");
      setEditMode(false);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-2xl font-bold mb-4">Seller Profile</h2>

      {!editMode ? (
        <>
          <p><strong>Name:</strong> {userData?.name}</p>
          <p><strong>Email:</strong> {userData?.email}</p>
          <button
            onClick={() => setEditMode(true)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Name"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email"
          />
          <input
            type="password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="New Password (optional)"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SellerProfile;
