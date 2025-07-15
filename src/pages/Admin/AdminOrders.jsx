import React, { useEffect, useState } from "react";
import { api } from "../../config/axiosInstance";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data.orders);
    } catch (error) {
     // console.error("Error fetching admin orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  
  const verifyOrder = async (orderId) => {
    try {
      const res = await api.patch(`/admin/orders/${orderId}/verify`);
      toast.success("Order verified");

      // Refresh list
      fetchOrders();
    } catch (error) {
     // console.error("Verification failed:", error);
      toast.error("Failed to verify order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading orders...</p>;
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
  <h2 className="text-2xl font-bold mb-6 text-blue-800">All Orders</h2>

  {orders.map((order) => (
    <div
      key={order._id}
      className="bg-white border border-gray-300 rounded-lg p-4 mb-6 shadow"
    >
      <div className="mb-2 text-sm text-black font-semibold">
        <strong>Order ID:</strong> {order._id}
      </div>

      <div className="mb-1 text-sm text-gray-800">
        <strong>User:</strong> {order.userId?.name} ({order.userId?.email})
      </div>

      <div className="mb-1 text-sm text-gray-800">
        <strong>Amount:</strong> ₹{order.totalAmount}
      </div>

      <div className="mb-1 text-sm">
        <strong>Status:</strong>{" "}
        <span
          className={
            order.status === "Verified"
              ? "text-green-600 font-medium"
              : "text-yellow-600 font-medium"
          }
        >
          {order.status}
        </span>
      </div>

      <div className="mb-1 text-sm text-gray-700">
        <strong>Address:</strong> {order.address?.city}, {order.address?.state},{" "}
        {order.address?.pinCode} ({order.address?.phoneNumber})
      </div>

      <div className="mt-3">
        <p className="font-semibold text-black mb-1">Products:</p>
        <ul className="list-disc pl-6 text-sm text-gray-800">
          {order.products.map((item, idx) => (
            <li key={idx}>
              {item.productId?.title || "Product"} × {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      {!order.verifiedByAdmin && (
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => verifyOrder(order._id)}
        >
          ✅ Verify Order
        </button>
      )}
    </div>
  ))}
</div>

  );
};

export default AdminOrders;
