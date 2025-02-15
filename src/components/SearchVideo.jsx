import React, { useState, useRef, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FaCheckCircle, FaClock, FaDownload, FaShare, FaListUl, FaBookmark, FaBan, FaFlag } from "react-icons/fa";

const SearchVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  let timer = useRef(null);

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
  
  // Handle Mouse Enter (Start Delay)
  const handleMouseEnter = () => {
    timer.current = setTimeout(() => {
      setIsPlaying(true);
      videoRef.current?.play();
    }, 1000); // 1-second delay
  };

  // Handle Mouse Leave (Stop Video)
  const handleMouseLeave = () => {
    clearTimeout(timer.current); // Cancel play if not completed
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video
    }
  };

  return (
    <div className="flex bg-black text-white p-3 rounded-lg max-w-5xl shadow-lg">
      {/* Thumbnail / Video */}
      <div
        className="relative w-[40%] h-[40%] flex-shrink-0 rounded-lg overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isPlaying ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
            muted
            loop
          />
        ) : (
          <img
            className="w-full h-full object-cover"
            src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            alt="Uyi Amma Thumbnail"
          />
        )}

        {/* Video Duration (only show when not playing) */}
        {!isPlaying && (
          <span className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
            3:15
          </span>
        )}
      </div>

      {/* Video Info */}
      <div className="ml-3 flex-grow">
        <h3 className="text-md font-semibold line-clamp-2">
          Uyi Amma - Azaad | Aaman D, Rasha Thadani | Madhubanti Bagchi, Amit Trivedi, Amitabh | Bosco | Abhishek K
        </h3>
        <p className="text-sm text-gray-400">89M views • 1 month ago</p>

        {/* Channel Info */}
        <div className="flex items-center text-sm text-gray-400">
          <span className="flex items-center gap-1">
            Zee Music Company <FaCheckCircle className="text-blue-500 text-xs" />
          </span>
        </div>

        {/* Song Details */}
        <p className="text-sm text-gray-400 line-clamp-1">
          Song: Uyi Amma Singer: Madhubanti Bagchi Composed by: Amit Trivedi Lyrics: Amitabh Bhattacharya...
        </p>
      </div>
      {/* Dots Menu Button */}
              <div className="ml-auto relative" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="p-2">
                  <HiDotsVertical />
                </button>
              </div>
      {/* Dropdown Menu */}
            {isOpen && (
                  <div className="absolute left-[63%] top-[2%] mt-2 w-56 bg-gray-900 z-10 text-white rounded-lg shadow-lg">
                    <ul className="py-2">
                      <MenuItem icon={<FaListUl />} text="Add to queue" />
                      <MenuItem icon={<FaClock />} text="Save to Watch Later" />
                      <MenuItem icon={<FaBookmark />} text="Save to playlist" />
                      <MenuItem icon={<FaDownload />} text="Download" />
                      <MenuItem icon={<FaShare />} text="Share" />
                      <hr className="border-gray-700 my-1" />
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

export default SearchVideo;
