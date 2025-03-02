import React, { useEffect, useRef, useState } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import "./VideoPlayer.css";  

const VideoPlayer = ({ videoSrc }) => {
  console.log(videoSrc);
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  // Define different video sources based on quality
  const videoSources = [
    {
      src: videoSrc, // Original URL for auto quality
      quality: "auto",
    },
    {
      src: videoSrc.replace("/upload/", "/upload/w_256,h_144/"),
      quality: 144,
    },
    {
      src: videoSrc.replace("/upload/", "/upload/w_426,h_240/"),
      quality: 240,
    },
    {
      src: videoSrc.replace("/upload/", "/upload/w_640,h_360/"),
      quality: 360,
    },
    {
      src: videoSrc.replace("/upload/", "/upload/w_854,h_480/"),
      quality: 480,
    },
    {
      src: videoSrc.replace("/upload/", "/upload/w_1280,h_720/"),
      quality: 720,
    },
    {
      src: videoSrc.replace("/upload/", "/upload/w_1920,h_1080/"),
      quality: 1080,
    },
  ];

  useEffect(() => {
    if (videoRef.current) {
      // Define sources in a format Plyr can recognize
      const sources = {
        type: "video",
        sources: videoSources.map((source) => ({
          src: source.src,
          type: "video/mp4",
          size: source.quality === "auto" ? 720 : source.quality,  // Use 720 for auto as default
        })),
      };

      // Initialize Plyr with multiple sources
      const plyr = new Plyr(videoRef.current, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "fullscreen",
        ],
        settings: ["captions", "quality", "speed"],
        speed: {
          selected: 1,
          options: [0.5, 0.75, 1, 1.25, 1.5, 2],
        },
        quality: {
          default: 720,
          options: [144, 240, 360, 480, 720, 1080],
          forced: true,
        },
      });

      // Load sources into Plyr
      plyr.source = sources;

      setPlayer(plyr);

      // Cleanup on component unmount
      return () => {
        plyr.destroy();
      };
    }
  }, [videoSrc]);  // Include videoSrc as a dependency

  if (videoSources.length === 0) return <p>Video not found</p>;

  // Simplified video source handling
  return (
    <div className="m-6">
      <video ref={videoRef} controls width="720" height="360">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
