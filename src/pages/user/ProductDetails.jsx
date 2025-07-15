import React, { useEffect, useState } from "react";
import { api } from "../../config/axiosInstance";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        const productRes = await api.get(`/products/${id}`);
        setProduct(productRes.data.data || productRes.data);

        const reviewsRes = await api.get(`/review/${id}`);
        setReviews(reviewsRes.data.reviews || []);
      } catch (err) {
        console.error("Error loading product/reviews", err);
      }
    };

    fetchProductAndReviews();

    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [id]);

  const handleAddToCart = async () => {
  const isSizeRequired = ["men", "women"].includes(product?.category?.toLowerCase());

  if (isSizeRequired && !selectedSize) {
    toast.warn("⚠️ Please select a size before adding to cart");
    return;
  }

  try {
    await api.post("/cart/add", {
      productId: product._id,
      quantity,
      ...(isSizeRequired && { size: selectedSize }), 
    });
    toast.success("✅ Added to cart!");
  } catch (err) {
    console.error("Error adding to cart", err);
    toast.error("❌ Failed to add to cart");
  }
};



  const handleAddReview = async () => {
    try {
      const res = await api.post("/review", {
        productId: product._id,
        rating,
        comment,
      });
      setReviews((prev) => [...prev, res.data.review]);
      setComment("");
      toast.success("Review submitted!");
    } catch (err) {
      console.error("Submit review error", err);
      toast.error(err?.response?.data?.message || "Failed to submit review");
    }
  };

  const renderStars = (value) => {
    const fullStars = Math.floor(value);
    const half = value - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) stars.push(<span key={i}>★</span>);
    if (half) stars.push(<span key="half">☆</span>);
    while (stars.length < 5) stars.push(<span key={"e" + stars.length}>☆</span>);

    return <span className="text-yellow-500">{stars}</span>;
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (

    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="md:flex gap-10">
        {/* Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.title}
            className="max-w-[400px] w-full object-contain rounded shadow bg-base-100"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 w-full mt-6 md:mt-0 space-y-4">
          <h1 className="text-2xl font-bold text-base-content">{product.title}</h1>
          <p className="text-base-content/70">{product.description}</p>
          <p className="text-xl font-semibold text-base-content">₹{product.price}</p>
          <p className="text-sm text-base-content/60">Stock: {product.stock}</p>

          <div className="flex items-center gap-2">
            <span className="font-medium">Rating:</span>
            {renderStars(product.rating)}
            <span className="text-sm text-gray-600">({product.rating})</span>
          </div>

          {/* Sizes */}
          
          <div>
            <label className="font-medium">Select Size:</label>
            <div className="flex space-x-2 mt-2">
              {Array.isArray(product.sizes) && product.sizes.length > 0 ? (
                product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 border rounded ${selectedSize === size
                        ? "bg-black text-white"
                        : "text-black border-gray-400"
                      }`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p className="text-sm text-gray-500">No sizes available</p>
              )}
            </div>
          </div>


          {/* Quantity */}
          <div className="flex items-center space-x-2 mt-4">
            <label className="font-medium">Quantity:</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border px-2 py-1 w-16 text-black"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 px-4 py-2 text-white rounded"
            >
              Add to Cart
            </button>
            <button 
             onClick={handleAddToCart}
            className="bg-green-600 px-4 py-2 text-white rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>


      {/* Reviews Section */}
      <div className="mt-12 w-full">
        <h2 className="text-xl font-bold text-base-content mb-4">Reviews</h2>
        <div className="space-y-4 mb-6">
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <div key={r._id} className="border p-3 rounded bg-base-200">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{r.userId?.name || "Anonymous"}</span>
                  <span className="text-yellow-500">{renderStars(r.rating)}</span>
                </div>
                <p className="text-base-content/70 mt-1">{r.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>

        {/* Review Form */}
        <div className="border-t pt-4 mt-8">
          <h3 className="font-semibold mb-2 text-base-content">Write a Review</h3>
          <div className="flex items-center gap-4 mb-2">
            <label className="text-sm">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="border px-2 py-1 text-black"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star}
                </option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2 text-base-content bg-base-100"
          />
          <button
            onClick={handleAddReview}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>

  );
};

export default ProductDetails;