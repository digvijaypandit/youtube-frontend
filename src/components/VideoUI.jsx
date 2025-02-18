import React from "react";

function VideoUI({ currentTime, duration, buffered, onSeek }) {
  return (
    <div>
      <div className="relative group">
        {/* Background Bar */}
        <div className="relative w-full h-[3px] bg-gray-500 rounded-md">
          {/* Buffered Progress */}
          <div
            className="absolute top-0 left-0 h-full bg-gray-300 transition-all duration-300 ease-in-out"
            style={{ width: `${buffered}%` }}
          ></div>

          {/* Red Progress Fill */}
          <div
            className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-300 ease-in-out"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>

        {/* Custom Range Input */}
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={(e) => onSeek(parseFloat(e.target.value))} // ✅ Invoke onSeek with new time
          className="absolute top-0 left-0 w-full h-2 opacity-0 cursor-pointer"
        />

        {/* Custom Red Circle (Slider Thumb) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 bg-red-600 rounded-full shadow-lg transition-all duration-200 ease-in-out opacity-0 group-hover:opacity-100"
          style={{
            left: `${(currentTime / duration) * 100}%`,
            width: "12px",
            height: "12px",
          }}
        ></div>
      </div>
    </div>
  );
}

export default VideoUI;
