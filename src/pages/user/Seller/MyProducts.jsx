import React, { useEffect, useState } from "react";
import { api } from "../../../config/axiosInstance";
import { toast } from "react-toastify";

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [updatedData, setUpdatedData] = useState({});

   
    const fetchProducts = async () => {
        try {
            const res = await api.get("/seller/products");
            setProducts(res.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    
    const handleEdit = async (id) => {
        try {
            const res = await api.get(`/seller/product/${id}`);
            setEditProduct(res.data.data);
            setUpdatedData({
                title: res.data.data.title,
                description: res.data.data.description,
                price: res.data.data.price,
            });
          toast.error("❌ Failed to load/edit product");

        } catch (error) {
            //console.error("Error loading product:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await api.patch(`/seller/product/${editProduct._id}`, updatedData);
            toast.success("Product updated");

           // console.log("Updated:", res.data);
            setEditProduct(null);
            fetchProducts(); 
        } catch (error) {
            //console.error("Error updating product:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-6 text-black">
            <h2 className="text-2xl font-bold mb-4"> My Products</h2>

            {editProduct && (
                <div className="border p-4 mb-6 bg-gray-50">
                    <h3 className="text-xl font-semibold mb-2"> Edit Product</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        value={updatedData.title}
                        onChange={(e) => setUpdatedData({ ...updatedData, title: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
                    <textarea
                        placeholder="Description"
                        value={updatedData.description}
                        onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={updatedData.price}
                        onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
                        className="border p-2 mb-2 w-full"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleUpdate}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditProduct(null)}
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="border rounded p-4 shadow">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-40 object-contain rounded bg-white"
                        />
                        <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                        <p className="text-green-600 font-bold">₹{product.price}</p>
                        <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                        <button
                            onClick={() => handleEdit(product._id)}
                            className="mt-2 bg-yellow-500 text-white px-4 py-1 rounded"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProducts;
