import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import VideoInfoCard from "../components/VideoInfoCard";
import Header from "../components/header/Header";
import SmallVideoCards from "./SmallVideoCards";
import CommentSection from "../components/CommentSection";

const VideoPage = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) {
      setError("No video ID found.");
      setLoading(false);
      return;
    }

    const fetchVideoData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setError("Unauthorized: No access token found.");
        setLoading(false);
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

        if (!response.ok) {
          throw new Error("Failed to fetch video");
        }

        const result = await response.json();
        if (result.success && result.data) {
          setVideoData(result.data);
        } else {
          throw new Error("Invalid video data");
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
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
