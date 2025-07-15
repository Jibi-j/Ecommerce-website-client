import React, { useEffect, useState } from "react";
import { api } from "../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products", err);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchProducts();
  }, [navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link to={`/products/${product._id}`}>
  <div key={product._id} className="border rounded shadow p-2 hover:shadow-lg">
    <img
      src={product.image}
      alt={product.name || product.title}
      className="w-full aspect-[4/3] object-contain rounded bg-white"
    />
    <h2 className="text-lg font-semibold mt-2">{product.name || product.title}</h2>
    <p className="text-sm text-gray-700">₹{product.price}</p>
    <p className="text-xs text-gray-500">{product.category}</p>
  </div>
</Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
