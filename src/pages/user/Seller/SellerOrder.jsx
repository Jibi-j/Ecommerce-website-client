import React, { useEffect, useState } from "react";
import { api } from "../../../config/axiosInstance";
import { toast } from "react-toastify";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/seller/orders");
      setOrders(res.data.orders);
    } catch (error) {
      toast.error("Failed to fetch seller orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center">Loading orders...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="border p-4 rounded mb-4 shadow-sm bg-white">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>User:</strong> {order.userId?.name} ({order.userId?.email})</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Shipping To:</strong> {order.address?.city}, {order.address?.state}, {order.address?.pinCode}</p>

          <h4 className="mt-3 font-semibold">Products:</h4>
          <ul className="list-disc pl-5 text-sm">
            {order.products.map((item, i) => (
              <li key={i}>
                {item.productId?.title || "Product"} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SellerOrders;
