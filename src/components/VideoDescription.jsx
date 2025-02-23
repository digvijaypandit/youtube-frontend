import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoDescription = () => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Replace with your API endpoint
    axios.get("https://api.example.com/video-description")
      .then(response => {
        setVideoInfo(response.data);
      })
      .catch(error => {
        console.error("Error fetching video description:", error);
      });
  }, []);

  if (!videoInfo) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      {/* Video Stats */}
      <p className="text-gray-400 font-semibold">
        {videoInfo.views} views • {videoInfo.uploadDate} 
        {videoInfo.tags && videoInfo.tags.map((tag, index) => (
          <span key={index} className="text-blue-400 ml-2">#{tag}</span>
        ))}
      </p>

      {/* Description Preview */}
      <p className="mt-2">
        {expanded ? videoInfo.fullDescription : videoInfo.shortDescription}
      </p>

      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-400 font-semibold mt-2"
      >
        {expanded ? "Show less" : "...more"}
      </button>
    </div>
  );
};

export default VideoDescription;
