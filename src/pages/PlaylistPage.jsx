import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PlaylistVideoCard from "../components/PlaylistVideoCard";
import Header from "../components/header/Header";
import { FaPlus, FaPen } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import ShareComponent from "../components/ShareComponent";
import { format } from "timeago.js"

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isShare, setIsShare] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/playlist/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPlaylist(response.data.data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId, accessToken]);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (!playlist) {
    return <div className="text-center text-white">Playlist not found</div>;
  }

  return (
    <>
      <Header />
      <div className="p-16 max-w-screen">
        <div className="min-h-screen bg-[#0f0f0f] text-white p-5 flex">
          {/* Sidebar */}
          <div className="fixed">
            <div
              style={{
                backgroundImage: `url(${playlist.video[0]?.thumbnail})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
              className="relative max-w-sm h-[80vh] rounded-xl shadow-lg text-white p-4 overflow-hidden"
            >
              <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-b from-black/10 to-black/100 z-0"></div>
              <div className="relative z-10 cursor-pointer">
                <img
                  className="rounded-lg"
                  src={playlist?.video[0]?.thumbnail || ""}
                  alt="Playlist Thumbnail"
                />
              </div>

              <div className="relative z-10 mt-4">
                <h2 className="text-xl font-semibold">{playlist?.name}</h2>
                <div className="flex items-center mt-1 text-sm text-white">
                  <div className="flex items-center">
                    <img
                      src={playlist?.onwer?.avatar || ""}
                      className="rounded-full w-8 h-8 mr-2"
                      alt="Owner Avatar"
                    />
                    <span>by {playlist?.onwer?.fullName}</span>
                  </div>
                </div>
                <div className="text-sm text-[#ababab] mt-2">
                  {playlist?.video?.length || 0} videos • Public • {format(playlist.updatedAt)}
                </div>
              </div>

              <div className="relative z-10 flex justify-between mt-4">
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
                  <button className="p-3 rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700">
                    <FaPlus />
                  </button>
                  <button className="p-3 rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700">
                    <FaPen />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setIsShare((prev) => !prev)}
                      className="p-3 rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700"
                    >
                      <TbShare3 />
                    </button>
                    {isShare && (
                      <div className="absolute top-12 left-0 shadow-lg p-4 rounded-md bg-white text-black z-20">
                        <ShareComponent />
                      </div>
                    )}
                  </div>
                  <button className="p-3 rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700">
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video List */}
          <div className="grid gap-4 p-2 w-auto overflow-hidden absolute right-0 top-20 h-auto">
            {playlist?.video?.map((video) => (
              <PlaylistVideoCard key={video._id} video={video} onwer={playlist?.onwer} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistPage;
