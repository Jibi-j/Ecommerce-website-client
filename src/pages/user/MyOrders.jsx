import React, { useEffect, useState } from "react";
import { api } from "../../config/axiosInstance";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-center">Loading your orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-center text-gray-600">You have no orders yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-6 text-black">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-md rounded p-4 mb-6 border border-gray-200"
        >
          <p className="text-black font-medium mb-1">
            Order ID: <span className="text-gray-700">{order._id}</span>
          </p>
          <p>
            Status: <span className="text-green-600">{order.paymentStatus || "Paid"}</span>
          </p>
          <p>Amount: ₹{order.totalAmount}</p>
          <p>Placed On: {new Date(order.createdAt).toLocaleString()}</p>

          {order.address && (
            <div className="mt-3">
              <p className="font-semibold text-black">Delivery Address:</p>
              <p className="text-gray-700 text-sm ml-2">City: {order.address.city}</p>
              <p className="text-gray-700 text-sm ml-2">State: {order.address.state}</p>
              <p className="text-gray-700 text-sm ml-2">Phone: {order.address.phoneNumber}</p>
              <p className="text-gray-700 text-sm ml-2">Pincode: {order.address.pinCode}</p>
            </div>
          )}

          <div className="mt-3">
            <p className="font-semibold text-black">Items:</p>
            <ul className="mt-2 space-y-3">
              {order.products.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                  <Link
                    to={`/products/${item.productId?._id}`}
                    className="flex items-center gap-3 hover:text-green-400"
                  >
                    <img
                      src={item.productId?.image || "https://via.placeholder.com/50"}
                      alt={item.productId?.title || "Product"}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <span>
                      {item.productId?.title || "Product"} × {item.quantity}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <Link
        to="/"
        className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default MyOrders;
