import React, { useState, useEffect, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaClock, FaDownload, FaShare, FaListUl, FaBookmark, FaBan, FaFlag } from "react-icons/fa";

const VideoThumbnail = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // To track clicks outside

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-sm m-5 bg-black text-white rounded-lg overflow-hidden shadow-lg">
      {/* Thumbnail Image */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover "
          src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
          alt="Veer Sambhaji Song"
        />
        {/* Video Duration */}
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
          3:25
        </span>
      </div>

      {/* Video Details */}
      <div className="flex p-3 relative">
        {/* Channel Image */}
        <img
          className="h-10 w-10 rounded-full mr-3"
          src="https://yt3.ggpht.com/ytc/AOPolaR9zU-ExampleImage=s88-c-k-c0x00ffffff-no-rj"
          alt="Channel"
        />
        {/* Video Info */}
        <div>
          <h3 className="text-md font-semibold">Veer Sambhaji | CHAAVA 2025</h3>
          <p className="text-sm text-gray-400">Amardeep Singh ✅</p>
          <p className="text-sm text-gray-400">69K views • 4 days ago</p>
        </div>

        {/* Dots Menu Button */}
        <div className="ml-auto relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="p-2">
            <HiDotsVertical />
          </button>
        </div>
      </div>
      {/* Dropdown Menu */}
      {isOpen && (
            <div className="absolute left-[30%] top-[35%] mt-2 w-56 bg-gray-900 z-10 text-white rounded-lg shadow-lg">
              <ul className="py-2">
                <MenuItem icon={<FaListUl />} text="Add to queue" />
                <MenuItem icon={<FaClock />} text="Save to Watch Later" />
                <MenuItem icon={<FaBookmark />} text="Save to playlist" />
                <MenuItem icon={<FaDownload />} text="Download" />
                <MenuItem icon={<FaShare />} text="Share" />
                <hr className="border-gray-700 my-1" />
                <MenuItem icon={<FaBan />} text="Not interested" />
                <MenuItem icon={<FaBan />} text="Don't recommend channel" />
                <MenuItem icon={<FaFlag />} text="Report" />
              </ul>
            </div>
          )}
    </div>
  );
};

// Menu Item Component
const MenuItem = ({ icon, text }) => (
  <li className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer">
    <span className="mr-3 text-lg">{icon}</span>
    {text}
  </li>
);

export default VideoThumbnail;
