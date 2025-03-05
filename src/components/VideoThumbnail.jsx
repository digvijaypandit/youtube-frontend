import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import millify from "millify";
import MenuBox from "./Popup/MenuBox";

const VideoThumbnail = ({ video }) => {
  if (!video) return null;
  const navigate = useNavigate();

  const { _id, title, thumbnail, views, createdAt, duration, owner } = video;

  const [user, setUser] = useState({ username: "", avatar: "" });
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
    <div onClick={() => navigate(`/watch/${_id}`)} className="w-88 m-4 mb-20 bg-white dark:bg-[#0f0f0f] text-black dark:text-white rounded-lg shadow-lg">
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
        <div className="mr-3 h-10 w-10 absolute top-5 left-0">
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

        <div className="max-h-30 overflow-hidden absolute left-12">
          <h3 className="text-md font-semibold cursor-pointer">
            {title.slice(0,60) || "Untitled Video"}{title.length > 60 ? "..." : ""}
          </h3>
          <p  onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/channel/${user.username}`);
                    }} className="text-sm text-gray-400 hover:text-gray-50 cursor-pointer font-semibold">
            {user.username || "Unknown User"}
          </p>
          <p className="text-sm text-gray-400 cursor-pointer">
          {millify(views || 0)} views • {createdAt ? format(createdAt) : "Unknown Date"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default VideoThumbnail;
