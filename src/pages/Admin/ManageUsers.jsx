import React, { useEffect, useState } from "react";
import { api } from "../../config/axiosInstance";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
      console.error("Error fetching users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/user/${userId}`);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-4">
  {users
    .filter((user) => user.role !== "admin")
    .map((user) => (
      <div
        key={user._id}
        className="flex justify-between items-center p-4 border rounded shadow-sm bg-white"
      >
        <div>
          <h3 className="font-semibold text-black">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-500">Role: {user.role}</p>
        </div>
        <button
          onClick={() => handleDelete(user._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    ))}
</div>

      )}
    </div>
  );
};

export default ManageUsers;
