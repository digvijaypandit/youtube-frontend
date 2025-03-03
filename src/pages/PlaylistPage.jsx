import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PlaylistVideoCard from "../components/PlaylistVideoCard";
import Header from "../components/header/Header";
import { FaPlus, FaPen } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import ShareComponent from "../components/ShareComponent";

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("accessToken");
  const [isShare, setIsShare] = useState(false);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/playlist/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPlaylist(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlist:", error);
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!playlist) {
    return <div className="text-center text-white">Playlist not found</div>;
  }

  return (
    <>
      <Header />
      <div className='p-16 max-w-screen'>
        <div className="min-h-screen bg-black text-white p-5 flex">
          <div className="max-w-sm bg-gradient-to-b fixed from-[#343232] to-[#101010] rounded-xl shadow-lg text-white p-4">
            {/* Thumbnail */}
            <div className="relative">
              <img
                className="rounded-lg"
                src={playlist.video[0].thumbnail}
                alt="Playlist Thumbnail"
              />
              <button className="absolute bottom-2 right-2 bg-white text-black cursor-pointer rounded-full p-1 shadow">
                <FaPen />
              </button>
            </div>

            {/* Content */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold">{playlist.name}</h2>
              <div className="flex items-center mt-1 text-sm text-white">
                <div className="flex items-center">
                  <img src={playlist.onwer.avatar} className="rounded-full w-8 h-8 mr-2" />
                  <span className="">by {playlist.onwer.fullName}</span>
                </div>
              </div>
              <div className="text-sm text-[#ababab] mt-2">
                Playlist • Public • {playlist.video.length} videos
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <div>
                <button className="flex items-center cursor-pointer bg-white text-gray-800 rounded-full py-1 px-4 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.25v13.5l11.25-6.75L5.25 5.25z"
                  />
                </svg>
                Play all
              </button>
              </div>
              <div className="flex gap-2 text-white">
                <div>
                  <button className="p-3 rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700">
                  <FaPlus />
                </button>
                </div>
                <div> <button className="p-3 rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700">
                  <FaPen />
                </button>
                </div>
                <div>
                  <button  onClick={() => setIsShare((prev) => !prev)} className="p-3 rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700">
                    <TbShare3 />
                  </button>
                  {isShare && (
                    <div className="scale-z-50 relative -top-80 -left-70 shadow-lg p-4 rounded-md">
                      <ShareComponent />
                    </div>
                  )}
                </div>
                <div>
                  <button className="p-3 rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700">
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Video List */}
          <div className="grid gap-4 p-2 w-auto overflow-hidden absolute right-0 h-auto">
            {playlist.video.map((video) => (
              <PlaylistVideoCard key={video._id} video={video} onwer={playlist.onwer} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistPage;