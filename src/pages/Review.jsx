import React, { useEffect, useState } from "react";
import { api } from "../../config/axiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(5);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get("/review");
      setReviews(res.data.reviews || []);
    } catch (err) {
      //console.error("Fetch reviews error:", err);
      toast.error("❌ Failed to load your reviews");
    }
  };

  const handleEdit = (review) => {
    setEditingReviewId(review._id);
    setEditedComment(review.comment);
    setEditedRating(review.rating);
  };

  const handleUpdate = async (reviewId) => {
    try {
      await api.put(`/reviews/${reviewId}`, {
        comment: editedComment,
        rating: editedRating,
      });
      toast.success("✅ Review updated!");
      setEditingReviewId(null);
      fetchReviews();
    } catch (err) {
      //console.error("Update error:", err);
      toast.error("❌ Failed to update review");
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await api.delete(`/reviews/${reviewId}`);
      toast.success("🗑️ Review deleted!");
      setReviews(reviews.filter((r) => r._id !== reviewId));
    } catch (err) {
     // console.error("Delete error:", err);
      toast.error("❌ Failed to delete review");
    }
  };

  const renderStars = (rating) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-black">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-600">You haven't written any reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border rounded p-4 mb-4 bg-gray-100">
            <h3 className="font-semibold mb-2">
              Product: {review.productId?.title}
            </h3>

            {editingReviewId === review._id ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium">Rating:</label>
                <select
                  value={editedRating}
                  onChange={(e) => setEditedRating(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-black"
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star}
                    </option>
                  ))}
                </select>

                <textarea
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                  className="w-full border rounded p-2 text-black"
                />

                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => handleUpdate(review._id)}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingReviewId(null)}
                    className="text-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-2 text-yellow-600">
                  Rating: {renderStars(review.rating)}
                </p>
                <p className="text-gray-700">{review.comment}</p>
                <div className="mt-2 space-x-4">
                  <button
                    onClick={() => handleEdit(review)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Review;
