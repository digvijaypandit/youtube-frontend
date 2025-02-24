import { useState, useEffect } from "react";
import axios from "axios";

// Function to convert date to "time ago" format
const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years !== 1 ? "s" : ""} ago`;
};

const VideoThumbnail = ({ video }) => {
  if (!video) return null;

  const { title, thumbnail, views, createdAt, duration, owner } = video;

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
    <div className="w-88 m-4 bg-[#181818] text-white rounded-lg overflow-hidden shadow-lg">
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
          <p className="text-sm text-gray-400 cursor-pointer">
            {views || 0} views • {createdAt ? timeAgo(createdAt) : "Unknown Date"}
          </p>
          <p className="text-sm text-gray-400 hover:text-gray-50 cursor-pointer font-semibold">
            {user.username || "Unknown User"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
