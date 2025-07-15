import React, { useEffect, useState } from "react";
import { api } from "../../config/axiosInstance";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center p-4 border rounded shadow-sm bg-white"
            >
              <div>
                <h3 className="font-semibold text-black">{product.title}</h3>
                <p className="text-gray-600">Price: ₹{product.price}</p>
                <p className="text-sm text-gray-500">
                  Seller: {product?.sellerId?.email || "N/A"}
                </p>
              </div>
              <button
                onClick={() => handleDelete(product._id)}
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

export default ManageProducts;
