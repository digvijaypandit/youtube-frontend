import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import VideoInfoCard from "../components/VideoInfoCard";
import Header from "../components/header/Header";
import SmallVideoCards from "./SmallVideoCards";
import CommentSection from "../components/CommentSection";

const VideoPage = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [status, setStatus] = useState("loading"); // 'loading', 'error', or 'success'
  const accessToken = localStorage.getItem("accessToken"); // Minimize localStorage calls

  const fetchVideoData = useCallback(async () => {
    if (!videoId) return setStatus("error");

    if (!accessToken) {
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/videos/${videoId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch video");

      const result = await response.json();
      if (result.success && result.data) {
        setVideoData(result.data);
        setStatus("success");
      } else {
        throw new Error("Invalid video data");
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      setStatus("error");
    }
  }, [videoId, accessToken]);

  useEffect(() => {
    fetchVideoData();
  }, [fetchVideoData]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error loading video.</p>;
  if (!videoData) return <p>Video not found</p>;

  return (
    <div>
      <Header hiddensidebar={true} />
      <div className="p-14 flex ml-2 max-w-screen bg-[#0f0f0f]">
        <div>
          <VideoPlayer videoSrc={videoData.videoFile} />
          <VideoInfoCard videoDetails={videoData} />
          <CommentSection videoId={videoId} />
        </div>
        <SmallVideoCards />
      </div>
    </div>
  );
};

export default VideoPage;
