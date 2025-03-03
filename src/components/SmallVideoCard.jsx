import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "timeago.js";
import millify from "millify";

const SmallVideoCard = ({ video, channel, mainDiv="flex w-[400px] cursor-pointer p-2", imgDiv="relative w-[45%]", imgelem="rounded-lg w-full h-[100px] object-cover", textelem="m-2 flex w-[55%] gap-2 "}) => {
  const navigate = useNavigate();
  
  const handleNavigation = (e) => {
    e.preventDefault();
    navigate(`/watch/${video._id}`);
  };

  return (
    <div to={`/watch/${video._id}`} className={`${mainDiv} bg-[#0f0f0f]`} onClick={handleNavigation} >
      {/* Thumbnail */}
      <div className={`${imgDiv}`}>
        <img 
          src={video.thumbnail}
          className={`${imgelem}`}
        />
        <span className="absolute bottom-2 right-2 bg-[#262626ad] text-white text-xs px-1 py-0.5 rounded">
          {Math.floor((video.duration || 0) / 60)}:
          {Math.floor((video.duration || 0) % 60).toString().padStart(2, "0")}
        </span>
      </div>

      {/* Video Details */}
      <div className={`${textelem}`}>
        {/* Video Info */}
        <div>
          <h3 className="text-white font-semibold text-sm line-clamp-2">
            {video.title}
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            {channel.data.username}
          </p>
          <p className="text-gray-400 text-xs">
            {millify(video.views)} views • {format(video.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmallVideoCard;
