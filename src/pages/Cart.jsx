import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { api } from "../config/axiosInstance";
import { FaTrash } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({
    city: "",
    state: "",
    phoneNumber: "",
    pinCode: "",
  });

  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  const hasPlacedOrder = useRef(false); 
  const fetchCart = async () => {
    try {
      const res = await api.get("/cart/get");
      setCart(res.data.cart.items);
    } catch (error) {
      console.error("Error fetching cart", error);
      toast.error("Failed to load cart");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`, {
        data: { productId },
      });
      fetchCart();
      toast.info("Item removed from cart");
    } catch (err) {
      console.error("Error removing item", err);
      toast.error("❌ Failed to remove item");
    }
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    const { city, state, phoneNumber, pinCode } = address;
    return city && state && phoneNumber && pinCode;
  };

  const makePayment = async () => {
    if (!validateAddress()) {
      toast.warn("⚠️ Please fill in all address fields");
      return;
    }

    try {
      localStorage.setItem("checkoutCart", JSON.stringify(cart));
      localStorage.setItem("checkoutAddress", JSON.stringify(address));

      const stripe = await stripePromise;

      const products = cart.map((item) => ({
        name: item.productId.title,
        price: item.productId.price,
        image: item.productId.image,
        quantity: item.quantity,
        size: item.size,
      }));

      const session = await api.post("/payment/create-checkout-session", {
        products,
      });

      await stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("❌ Checkout failed");
    }
  };

  const placeOrder = async () => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("checkoutCart") || "[]");
      const storedAddress = JSON.parse(localStorage.getItem("checkoutAddress") || "{}");

      const products = storedCart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        size: item.size,
      }));

      const totalAmount = storedCart.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
      );

      if (!products.length || totalAmount === 0) return;

      await api.post("/orders/create", {
        products,
        totalAmount,
        address: storedAddress,
      });

      await api.delete("/cart/clear");

      localStorage.removeItem("checkoutCart");
      localStorage.removeItem("checkoutAddress");

      fetchCart();
      toast.success("🎉 Order placed successfully");
    } catch (error) {
      toast.error("❌ Failed to place order");
    }
  };

  useEffect(() => {
    fetchCart();

    if (success && cart.length === 0 && !hasPlacedOrder.current) {
      placeOrder();
      hasPlacedOrder.current = true;
    }
  }, [success, cart]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-base-content">My Cart</h2>

      {success && (
        <div className="bg-green-100 text-black border border-green-300 p-4 rounded mb-4">
          🎉 Payment successful! Your order has been placed.
          <Link to="/dashboard/orders" className="ml-2 text-blue-600 hover:text-blue-800">
            Go to My Orders
          </Link>
        </div>
      )}

      {canceled && (
        <div className="bg-red-100 text-red-800 border border-red-300 p-4 rounded mb-4">
          ❌ Payment was canceled. Please try again.
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-base-content/70">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-4">
            {cart.map((item) => (
              <div key={item.productId._id} className="bg-base-100 p-4 rounded shadow">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <p className="font-semibold">{item.productId.title}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    <p>Total: ₹{item.quantity * item.productId.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.productId._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-base-100 p-4 rounded shadow mt-6">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <input
              type="text"
              placeholder="City"
              name="city"
              className="input input-bordered w-full mb-2"
              value={address.city}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              className="input input-bordered w-full mb-2"
              value={address.state}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              className="input input-bordered w-full mb-2"
              value={address.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="PIN Code"
              name="pinCode"
              className="input input-bordered w-full mb-2"
              value={address.pinCode}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={makePayment}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
