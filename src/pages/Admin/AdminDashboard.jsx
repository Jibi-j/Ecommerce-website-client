import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-pink-100 text-black p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
         
          <li><Link to="products">Manage products</Link></li>
          <li><Link to="users">Manage Users</Link></li>
          <li><Link to="orders">Admin Orders</Link></li>
        </ul>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
