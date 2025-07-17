import React, { useState } from "react";
import { api } from "../../../config/axiosInstance";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [sizes, setSizes] = useState([]); 
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("rating", rating);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image", image); 

      const res = await api.post("/seller/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //console.log(" Product created:", res.data);
      toast.success(" Product created successfully!");
    } catch (err) {
      console.error(" Error creating product:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <div className=p-4 sm:p-6 max-w-xl mx-auto text-black">
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder='Sizes (e.g. ["S","M","L"])'
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setSizes(parsed);
            } catch {
              setSizes([]);
            }
          }}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
