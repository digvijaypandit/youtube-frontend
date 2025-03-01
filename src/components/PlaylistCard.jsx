import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const PlaylistCard = (item) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/watch/${item.playlist.video[0]._id}`)}
            className="max-w-[230px] min-w-[230px] m-2 bg-black rounded-md flex flex-col shadow-lg relative cursor-pointer"
        >
            {/* Thumbnail */}
            <div className="relative">
                <div
                    className={`absolute -top-2 left-3 w-[200px] h-[174px] pt-1 bg-cover rounded-md bg-center ${item.playlist.video.length > 2 ? '' : 'bg-gray-800'}`}
                    style={{
                        backgroundImage:
                            item.playlist.video.length > 2
                                ? `url(${item.playlist.video[2].thumbnail})`
                                : 'none',
                    }}
                >
                </div>
                <div
                    className={`absolute -top-[2px] left-1 w-[215px] h-[174px] bg-cover rounded-md bg-center ${item.playlist.video.length > 1 ? '' : 'bg-gray-600'}`}
                    style={{
                        backgroundImage:
                            item.playlist.video.length > 1
                                ? `url(${item.playlist.video[1].thumbnail})`
                                : 'none',
                    }}
                ></div>
                <img
                    src={
                        item.playlist.video.length > 0
                            ? item.playlist.video[0].thumbnail
                            : 'default-thumbnail.jpg'
                    }
                    alt="Playlist Thumbnail"
                    className="relative top-0 left-0 w-[225px] h-[174px] pt-1 rounded-md flex flex-col shadow-lg cursor-pointer"
                />
                {/* Video count badge */}
                <div className="absolute bottom-2 right-2 flex items-center justify-between bg-black bg-opacity-70 text-white text-xs px-2 py-0.5 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="12" viewBox="0 0 12 10" width="12">
                        <path d="M1 3h10v1H1V3Zm0 2h6v1H1V5Zm0 2h6v1H1V7Zm7-2 4 2.5L8 10V5Z"></path>
                    </svg>&nbsp;{item.playlist.video.length} videos
                </div>
            </div>

            {/* Text content */}
            <div className="p-2">
                <h3 className="text-lg font-semibold truncate text-[#f2f2f2]">{item.playlist.name}</h3>
                <p className="text-sm text-[#ababab]">{item.playlist.onwer.username} • Playlist</p>
                <span
                    onClick={(e) => {
                        e.stopPropagation();  // Prevent navigation to /watch/:videoId
                        navigate(`/playlist/${item.playlist._id}`);  // Navigate to /playlist/:playlistId
                    }}
                    className="mt-1 text-sm hover:text-[#f2f2f2] text-[#ababab] cursor-pointer"
                >
                    View full playlist
                </span>
            </div>
        </div>
    );
};

export default PlaylistCard;
