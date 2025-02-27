import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CommentsSection = () => {
  const { videoId } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Comments
  const fetchComments = async (page) => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Unauthorized: No access token found.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/comments/${videoId}`,
        {
          params: { page, limit: 10 },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setComments(response.data.data.docs);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Add Comment
  const handleAddComment = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!newComment.trim() || !accessToken) return;

    try {
      await axios.post(
        `http://localhost:8000/api/v1/comments/${videoId}`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewComment("");
      fetchComments(page);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    if (videoId) fetchComments(page);
  }, [videoId, page]);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-900 text-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Comments</h2>

      {/* Add Comment Box */}
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow px-3 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
          placeholder="Add a comment..."
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
        >
          Post
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="p-3 bg-gray-800 rounded-lg">
            <p className="text-gray-300">{comment.content}</p>
            <span className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-400">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
