import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SmallVideoCard from "../components/SmallVideoCard";

const SmallVideoCards = () => {
  const { videoId } = useParams(); // Get videoId from URL params
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("No access token found!");
        setLoading(false);
        return;
      }

      try {
        // Fetch all videos
        const { data: videoResult } = await axios.get("http://localhost:8000/api/v1/videos/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!videoResult.data || !Array.isArray(videoResult.data)) {
          throw new Error("Unexpected API response format");
        }

        // Filter out the current video
        let validVideos = videoResult.data
          .filter(video => video.thumbnail && video._id !== videoId)
          .slice(0, 20);

        // Fetch channel data for each video owner
        const videosWithOwners = await Promise.all(
          validVideos.map(async (video) => {
            try {
              const { data: channelData } = await axios.get(
                `http://localhost:8000/api/v1/users/c/${video.owner}`,
                {
                  headers: { Authorization: `Bearer ${accessToken}` },
                }
              );
              return { ...video, ownerDetails: channelData };
            } catch (error) {
              console.error(`Error fetching channel data for owner ${video.owner}:`, error.message);
              return { ...video, ownerDetails: null };
            }
          })
        );

        setVideos(videosWithOwners);
      } catch (error) {
        console.error("Error fetching videos:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [videoId]); 

  if (loading) {
    return <p className="text-white">Loading videos...</p>;
  }

  return (
    <div className="flex flex-col my-2  bg-white dark:bg-black text-black dark:text-white">
      {videos.length > 0 ? (
        videos.map((video) => (
          <SmallVideoCard key={video._id} video={video} channel={video.ownerDetails} />
        ))
      ) : (
        <p className="text-white">No videos available.</p>
      )}
    </div>
  );
};

export default SmallVideoCards;
