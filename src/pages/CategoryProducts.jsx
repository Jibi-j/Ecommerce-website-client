import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../config/axiosInstance";
import { Link } from "react-router-dom";

const CategoryProducts = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchByCategory = async () => {
            try {
                const res = await api.get(`/products/category/${category}`);
                setProducts(res.data.data);
            } catch (err) {
                console.error("Error fetching category products", err);
                if (err.response?.status === 401) {
                    navigate("/login");
                }
            }
        };

        fetchByCategory();
    }, [category, navigate]);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-base-content capitalize">
                {category} Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link to={`/products/${product._id}`}>
                        <div key={product._id} className="border rounded shadow p-2 hover:shadow-lg bg-base-100">
                            <img
                                src={product.image}
                                alt={product.name || product.title}
                                className="w-full aspect-[4/3] object-contain rounded bg-white"
                            />
                            <h2 className="text-lg font-semibold mt-2 text-base-content">{product.title}</h2>
                            <p className="text-sm font-medium text-base-content mt-1">₹{product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;
