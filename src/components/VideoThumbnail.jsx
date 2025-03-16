import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import millify from "millify";
import ShareComponent from "../components/ShareComponent";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbShare3 } from "react-icons/tb";
import MenuBox from "./Popup/MenuBox";

const VideoThumbnail = ({ video, menuData }) => {
  if (!video) return null;

  const navigate = useNavigate();
  const MenuRef = useRef(null);
  const { _id, title, thumbnail, views, createdAt, duration, owner } = video;

  const [isShowMenu, setIsShowMenu] = useState(false);
  const [user, setUser] = useState({ username: "Unknown User", avatar: "/default-avatar.jpg" });
  const [isShare, setIsShare] = useState(false);

  // Fetch User Details
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
          username: response.data.data.username || "Unknown User",
          avatar: response.data.data.avatar || "/default-avatar.jpg",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [owner]);

  // Function to toggle menu visibility
  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent click from propagating to parent elements
    setIsShowMenu((prev) => !prev);
  };

  return (
    <div
      onClick={() => navigate(`/watch/${_id}`)}
      className="w-88 m-4 mb-20 bg-white dark:bg-[#0f0f0f] text-black dark:text-white rounded-lg shadow-lg relative cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-xl"
          src={thumbnail || "/default-thumbnail.jpg"}
          alt="Thumbnail"
        />
        {duration && (
          <span className="absolute bottom-2 right-2 bg-[#0000008a] bg-opacity-80 text-white h-5 text-sm px-1 rounded">
            {Math.floor(duration / 60)}:
            {Math.floor(duration % 60).toString().padStart(2, "0")}
          </span>
        )}
      </div>

      {/* Video Info */}
      <div className="flex p-3 relative">
        {/* User Avatar */}
        <div className="mr-3 h-10 w-10 absolute top-5 left-0">
          <img
            className="w-10 h-10 rounded-full"
            src={user.avatar}
            alt="User Avatar"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/channel/${user.username}`);
            }}
          />
        </div>

        {/* Menu Button */}
        <div
          ref={MenuRef}
          className="absolute top-8 right-2 p-2 z-40 rounded-2xl cursor-pointer hover:bg-gray-600"
          onClick={toggleMenu}
        >
          <BsThreeDotsVertical />
        </div>

        {/* Dropdown Menu */}
        {isShowMenu && <MenuBox menuData={menuData} videoId={_id} />}

        {/* Share Component */}
        {isShare && (
          <div className="absolute top-12 right-2 shadow-lg p-4 rounded-md bg-white text-black z-50">
            <ShareComponent />
          </div>
        )}

        {/* Video Text Info */}
        <div className="max-h-30 absolute left-12">
          <h3 className="text-md font-semibold">
            {title.slice(0, 60) || "Untitled Video"}
            {title.length > 60 ? "..." : ""}
          </h3>
          <p
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/channel/${user.username}`);
            }}
            className="text-sm text-gray-400 hover:text-gray-50 cursor-pointer font-semibold"
          >
            {user.username}
          </p>
          <p className="text-sm text-gray-400">
            {millify(views || 0)} views • {createdAt ? format(createdAt) : "Unknown Date"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;
