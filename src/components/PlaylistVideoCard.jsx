import React from 'react';
import { format } from "timeago.js";
import millify from "millify";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoReorderTwoOutline } from "react-icons/io5";

const PlaylistVideoCard = ({video,onwer}) => {
  return (
    <div className="bg-black cursor-pointer flex min-w-[780px] max-w-[780px] text-[#f2f2f2] hover:bg-[#262626] rounded-lg shadow-lg">
      <div className='pl-2 relative cursor-grab active:cursor-grabbing top-[35%] '><IoReorderTwoOutline size={30}/></div>
      <div className="relative w-[30%] m-1">
        <img
          className="rounded-lg w-full"
          src={video.thumbnail}
          alt="Thumbnail"
        />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-xs px-1 rounded">
          {Math.floor((video.duration || 0) / 60)}:
          {Math.floor((video.duration || 0) % 60).toString().padStart(2, "0")}
        </span>
      </div>

      <div className="p-2 m-2 w-[70%]">
        <h3 className="text-base font-semibold">
        {video.title}
        </h3>
        <p className="text-xs pt-2 text-[#ababab]"><span className='hover:text-[#f2f2f2] cursor-pointer'>{onwer.username}</span> • {millify(video.views)} views • {format(video.createdAt)}</p>
      </div>
      <div className='relative top-14 right-4 cursor-pointer'><BsThreeDotsVertical /></div>
    </div>
  );
};

export default PlaylistVideoCard;
