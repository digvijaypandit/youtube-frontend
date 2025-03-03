import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";

const CommentsSection = () => {
    const { videoId } = useParams();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalComments, setTotalComments] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"))

    const fetchComments = async (page) => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            console.error("Unauthorized: No access token found.");
            return;
        }
        console.log(page)
        try {
            const response = await axios.get(
                `http://localhost:8000/api/v1/comments/${videoId}`,
                {
                    params: { page:page, limit: 10 },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setComments(response.data.data.docs);
            console.log(comments);
            setTotalPages(response.data.data.totalPages);
            setTotalComments(response.data.data.totalDocs);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

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
        <div className="max-w-3xl mx-auto p-4 bg-[#0f0f0f] text-white rounded-lg">
            <h2 className="text-xl font-bold mb-4">{totalComments} Comments</h2>

            {/* Add Comment Box */}
            <div className="flex items-center space-x-2 mb-4">
                <img
                    src={user.avatar}
                    className="w-10 h-10 rounded-full"
                />
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-grow px-3 py-2 rounded-full bg-gray-800 text-white border border-gray-700 placeholder-gray-500"
                    placeholder="Add a comment..."
                />
                <button
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                >
                    Post
                </button>
            </div>

            {/* Comments List */}
            <div className="bg-[#0f0f0f]">
                {comments.map((comment) => (
                    <div key={comment._id} className="p-3 bg-[#0f0f0f] rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                            <img
                                src={comment.owner?.avatar}
                                alt={comment.owner?.username}
                                className="w-8 h-8 rounded-full cursor-pointer"
                            />
                            <span className="text-sm text-white cursor-pointer">@{comment.owner?.username}</span>
                            <span className="text-sm text-[#ababab] cursor-pointer hover:text-white">{format(comment.createdAt)}</span>
                        </div>
                        <p className="text-white whitespace-pre-wrap">{comment.content}</p>
                        <span className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 cursor-pointer text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-gray-400">
                    Page {page} of {totalPages}
                </span>
                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CommentsSection;