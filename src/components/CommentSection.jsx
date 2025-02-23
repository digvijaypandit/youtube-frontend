import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/comments?_limit=5");
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentObj = {
      id: comments.length + 1,
      name: "User",
      body: newComment,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment("");
    setIsTyping(false);
  };

  return (
    <div style={{ backgroundColor: "#181818", color: "white", padding: "15px", borderRadius: "8px" }}>
      <h2 onClick={() => setShowComments(!showComments)} style={{ cursor: "pointer" }}>
        {comments.length} Comments {showComments ? "▲" : "▼"}
      </h2>

      {/* Comment Input Field */}
      <div>
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onFocus={() => setIsTyping(true)}
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#202020",
            border: "1px solid gray",
            color: "white",
            borderRadius: "5px",
          }}
        />
        {isTyping && (
          <div style={{ marginTop: "5px" }}>
            <button onClick={() => setIsTyping(false)} style={{ marginRight: "10px", color: "gray" }}>
              Cancel
            </button>
            <button
              onClick={handleAddComment}
              style={{ backgroundColor: "#065fd4", color: "white", padding: "5px 10px", borderRadius: "5px" }}
            >
              Comment
            </button>
          </div>
        )}
      </div>

      {/* Comment List */}
      {showComments && (
        <div style={{ marginTop: "15px" }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ borderBottom: "1px solid gray", padding: "10px 0" }}>
              <strong>@{comment.name}</strong>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
