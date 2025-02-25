import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoThumbnail from "../components/VideoThumbnail";
import { useNavigate } from "react-router-dom";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("No accessToken found, redirecting to login.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/v1/videos/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.data && Array.isArray(response.data.data)) {
          setVideos(response.data.data);
        } else {
          console.error("API response does not contain an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-4 ml-8 p-5 bg-[#181818]">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="w-full sm:w-[48%] md:w-[48%] lg:w-[32%] xl:w-[32%] 2xl:w-[15%] p-5 space-y-4 bg-[#181818] rounded-lg">
        <div className="w-full h-48 bg-[#262626] rounded-md mb-2 animate-pulse"></div>
        <div className="space-y-2 mb-2">
          <div className="w-3/4 h-4 bg-[#262626] rounded animate-pulse"></div>
          <div className="w-1/2 h-4 bg-[#262626] rounded animate-pulse"></div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-[#262626] rounded-full animate-pulse"></div>
          <div className="w-2/3 h-4 bg-[#262626] rounded animate-pulse"></div>
        </div>
      </div>
      ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 p-5 bg-[#181818]">
      {Array.isArray(videos) && videos.length > 0 ? (
        videos.map((video) => (
          <div key={video._id} className="w-full sm:w-[48%] md:w-[48%] lg:w-[32%] xl:w-[32%] 2xl:w-[15%] p-2">
            <VideoThumbnail video={video} />
          </div>
        ))
      ) : (
        <p className="text-white">No videos available.</p>
      )}
    </div>
  );
};

export default VideoList;
