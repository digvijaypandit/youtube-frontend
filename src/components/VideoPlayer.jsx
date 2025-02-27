import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [videoSrc, setVideoSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) {
      setError("No video ID found in URL.");
      setLoading(false);
      return;
    }

    const fetchVideo = async () => {

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
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          response.text().then(text => console.log("Raw response:", text));
          throw new Error("Unauthorized request or failed to fetch video");
        }

        const result = await response.json();

        if (result.success && result.data?.videoFile) {
          setVideoSrc(result.data.videoFile);
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

    fetchVideo();
  }, [videoId]);

  if (loading) return <p>Loading video...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!videoSrc) return <p>Video not found</p>;

  return (
    <div className="m-6 ">
      <video key={videoSrc} controls width="720" height="360">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
