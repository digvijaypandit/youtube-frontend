import React, { useState } from "react";
import axios from "axios";

const CreatePlaylistModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?._id || null;

  const createPlaylist = async () => {
    if (!title.trim() || !userId) {
      setError("Invalid user or empty title.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("You are not authorized. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/playlist/",
        { name: title, description, owner: userId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log("Playlist created:", response.data);
      onClose();
    } catch (err) {
      console.error("Error creating playlist:", err);
      setError(err.response?.data?.message || "Failed to create playlist. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 text-white p-4 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold">New Playlist</h3>

        <input
          type="text"
          className="w-full p-2 bg-gray-800 mt-3 rounded-md"
          placeholder="Choose a title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full p-2 bg-gray-800 mt-3 rounded-md"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-end mt-4">
          <button className="p-2 bg-gray-700 mr-2 rounded-md" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`p-2 rounded-md ${title ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 cursor-not-allowed"}`}
            disabled={!title || loading}
            onClick={createPlaylist}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
