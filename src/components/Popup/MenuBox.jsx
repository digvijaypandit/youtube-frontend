import React from "react";
import { Link } from "react-router-dom";

function MenuBox({ menuData, videoId }) {
  return (
    <div className="bg-[#282828] absolute right-0 -top-20 z-50 rounded-2xl w-40">
      <div className="flex rounded-lg m-4">
        {menuData && menuData.length > 0 ? (
          <ul className="text-white space-y-2">
            {menuData.map((item, index) => (
              <li key={index} onClick={(e) => e.stopPropagation()} className="cursor-pointer w-32 hover:bg-[#7d7d7db9]">
                {item === "Edit" ? (
                  <Link to={`/edits/video/${videoId}`} className="block w-full h-full">
                    {item}
                  </Link>
                ) : item === "Save to playlist" ? (
                  <Link to={`/save-to-playlist`} state={{ videoId }} className="block w-full h-full">
                    {item}
                  </Link>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No menu items available</p>
        )}
      </div>
    </div>
  );
}

export default MenuBox;
