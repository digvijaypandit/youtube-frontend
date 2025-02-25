import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js"; // Import timeago.js

const VideoThumbnail = ({ video }) => {
  if (!video) return null;

  const { _id, title, thumbnail, views, createdAt, duration, owner } = video;

  // State for user details
  const [user, setUser] = useState({ username: "", avatar: "" });

  // Fetch user details
  useEffect(() => {
    if (!owner) return;

    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.error("No access token found");
          return;
        }

        const response = await axios.get(
          `http://localhost:8000/api/v1/users/c/${owner}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser({
          username: response.data.data.username,
          avatar: response.data.data.avatar,
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [owner]);

  return (
    <Link to={`/watch/${_id}`} className="w-88 m-4 bg-[#181818] text-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-xl cursor-pointer"
          src={thumbnail}
          alt="Thumbnail"
        />
        <span className="absolute bottom-2 right-2 cursor-pointer bg-[#0000008a] bg-opacity-80 text-white h-5 text-sm px-1 rounded">
          {Math.floor((duration || 0) / 60)}:
          {Math.floor((duration || 0) % 60).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="flex p-3 relative">
        <div className="mr-3">
          {user.avatar ? (
            <img
              className="w-10 h-10 rounded-full cursor-pointer"
              src={user.avatar}
              alt="User Avatar"
            />
          ) : (
            <div className="w-10 h-10 rounded-full cursor-pointer bg-gray-600 flex items-center justify-center">
              <span className="text-gray-300">?</span>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-md font-semibold cursor-pointer">
            {title || "Untitled Video"}
          </h3>
          <p className="text-sm text-gray-400 hover:text-gray-50 cursor-pointer font-semibold">
            {user.username || "Unknown User"}
          </p>
          <p className="text-sm text-gray-400 cursor-pointer">
            {views || 0} views • {createdAt ? format(createdAt) : "Unknown Date"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoThumbnail;
