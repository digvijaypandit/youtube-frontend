import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoJS = ({ options, onReady, children }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, options, () => {
        onReady && onReady(playerRef.current);
      });
    }
  }, [options, onReady]);

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-black rounded-md overflow-hidden">
      {/* Ensure the video element is rendered correctly */}
      <video ref={videoRef} className="video-js vjs-default-skin w-full h-auto" />
      {children}
    </div>
  );
};

export default VideoJS;
