import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsUp, FaThumbsDown, FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

const VideoInfoCard = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  
  useEffect(() => {
    // Replace this with your actual API endpoint
    axios.get("https://api.example.com/video")
      .then((response) => {
        setVideoDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching video details:", error);
      });
  }, []);

  if (!videoDetails) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (
    <div className="bg-black text-white p-4 w-full">
      {/* Video Title */}
      <h2 className="text-lg font-semibold">{videoDetails.title}</h2>

      {/* Channel Info */}
      <div className="flex items-center mt-3">
        <img
          src={videoDetails.channelImage}
          alt={videoDetails.channelName}
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3">
          <p className="font-bold">{videoDetails.channelName}</p>
          <p className="text-gray-400 text-sm">{videoDetails.subscribers} subscribers</p>
        </div>
        <button className="ml-4 bg-white text-black px-4 py-2 rounded-full font-semibold">
          Subscribe
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center mt-4 space-x-4">
        <button className="flex items-center bg-gray-700 px-3 py-2 rounded-full">
          <FaThumbsUp className="mr-2" /> {videoDetails.likes}
        </button>
        <button className="bg-gray-700 p-2 rounded-full">
          <FaThumbsDown />
        </button>
        <button className="flex items-center bg-gray-700 px-3 py-2 rounded-full">
          <FaShare className="mr-2" /> Share
        </button>
        <button className="bg-gray-700 p-2 rounded-full">
          <BsThreeDots />
        </button>
      </div>
    </div>
  );
};

export default VideoInfoCard;
