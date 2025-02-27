import React, { useState } from "react";
import { format } from "timeago.js";
import millify from "millify";

const VideoDescription = ({ videoInfo, channelInfo }) => {
  const [expanded, setExpanded] = useState(false);

  if (!videoInfo || !channelInfo) {
    return <div className="text-white p-4">Loading...</div>;
  }

  return (
    <div className="bg-[#262626] text-white p-4 mt-4 rounded-lg">
      {/* Video Stats */}
      <p className="text-white text-sm">
        {millify(videoInfo.data.views)} views • {format(videoInfo.data.createdAt)}
        {videoInfo.data.tags && videoInfo.data.tags.map((tag, index) => (
          <span key={index} className="text-blue-400 ml-2"> #{tag} </span>
        ))}
      </p>

      {/* Description or Channel Info */}
      {expanded ? (
        <div>
          <p className="mt-2">{videoInfo.data.title}</p>
          <br />
          <p className="mt-2">{videoInfo.data.description}</p>
          <br />
          <div className="flex items-center mt-2">
            <img
              src={channelInfo.data.avatar || "/default-avatar.png"}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div className="ml-3">
              <p className="font-bold cursor-pointer">{channelInfo.data.username}</p>
              <p className="text-gray-400 text-sm">
                {millify(channelInfo.data.subscribersCount || 0)} subscribers
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-2">{videoInfo.data.title}</p>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-blue-400 font-semibold mt-2 cursor-pointer"
      >
        {expanded ? "Show less" : "...more"}
      </button>
    </div>
  );
};

export default VideoDescription;
