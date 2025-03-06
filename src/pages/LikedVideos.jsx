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
                    <div className="fixed bg-gradient-to-b rounded-xl from-[#25242400] to-[#101010]">
                        <div
                            style={{
                                backgroundImage: `url(${likedVideos[0]?.thumbnail})`,
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
                                    src={likedVideos[0]?.thumbnail}
                                    alt="LikedVideos Thumbnail"
                                />
                            </div>

                            <div className="relative z-10 py-4 mt-4">
                                <h2 className="text-3xl font-semibold">Liked videos</h2>
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
