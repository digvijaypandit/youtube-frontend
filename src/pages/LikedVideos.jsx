import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaylistVideoCard from "../components/PlaylistVideoCard";
import Header from "../components/header/Header";
import { FaPlus, FaPen } from "react-icons/fa6";
import { TbShare3 } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import ShareComponent from "../components/ShareComponent";
import { format } from "timeago.js"

const LikedVideos = () => {
    const [likedVideos, setLikedVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem("accessToken");
    const [isShare, setIsShare] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        const fetchLikedVideos = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/likes/videos`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setLikedVideos(response.data.data);
                console.log("Videos from API:", response);
                console.log(likedVideos);
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error("Error fetching liked videos:", error);
                setLoading(false);
            }
        };

        fetchLikedVideos();
    }, [accessToken]);

    useEffect(() => {
        console.log("updateted data", likedVideos)
    }, [likedVideos])

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (likedVideos.length === 0) {
        return <div className="text-center text-white">No liked videos found</div>;
    }

    return (
        <>
            <Header />
            <div className='p-16 max-w-screen'>
                <div className="min-h-screen bg-[#0f0f0f] text-white p-5 flex">
                    <div className="fixed bg-gradient-to-b from-[#252424] to-[#101010]">
                        <div
                            style={{
                                backgroundImage: `url(${likedVideos[0]?.thumbnail})`,
                                backgroundPosition: 'center',
                            }}
                            className="relative max-w-sm h-screen rounded-xl shadow-lg text-white p-4 overflow-hidden"
                        >
                            <div className="absolute inset-0 backdrop-blur-2xl bg-black/30 z-0"></div>
                            <div className="relative z-10 cursor-pointer">
                                <img
                                    className="rounded-lg"
                                    src={likedVideos[0]?.thumbnail}
                                    alt="LikedVideos Thumbnail"
                                />
                            </div>

                            <div className="relative z-10 mt-4">
                                <h2 className="text-xl font-semibold">Liked videos</h2>
                                <div className="flex items-center mt-1 text-sm text-white">
                                    <div className="flex items-center">
                                        <img src={user.avatar} className="rounded-full w-8 h-8 mr-2" />
                                        <span>by {user.fullName}</span>
                                    </div>
                                </div>
                                <div className="text-sm text-[#ababab] mt-2">
                                    {likedVideos.length} videos • No views • Updated {format(likedVideos[0].updatedAt)}
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
                                    <div>
                                        <button
                                            onClick={() => setIsShare((prev) => !prev)}
                                            className="p-3 rounded-full cursor-pointer bg-gray-800 hover:bg-gray-700"
                                        >
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
                    </div>
                    <div className="grid gap-4 p-2 w-auto overflow-hidden absolute right-0 top-20 h-auto">
                        {likedVideos.map((video) => (
                            <PlaylistVideoCard
                                key={video._id}
                                video={video}
                                onwer={video.owner}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LikedVideos;
