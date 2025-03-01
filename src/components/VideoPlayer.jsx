import React from "react";

const VideoPlayer = ({ videoSrc }) => {
  if (!videoSrc) return <p>Video not found</p>;

  return (
    <div className="m-6">
      <video key={videoSrc} controls width="720" height="360">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
