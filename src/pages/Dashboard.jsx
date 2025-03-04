import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import axios from 'axios';
import SmallVideoCard from '../components/SmallVideoCard';
import PlaylistCard from '../components/PlaylistCard';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    
    const handleChannel = () => {;
        navigate(`/channel/${userData?.username}`);
    };
    
    const [userData, setUserData] = useState(null);
    const [watchHistory, setWatchHistory] = useState([]);
    const [playlist, setPlaylist] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;

        const fetchUserDataAndHistory = async () => {
            setLoading(true);
            const accessToken = localStorage.getItem("accessToken");

            if (!accessToken) {
                setError("Unauthorized: No access token found.");
                setLoading(false);
                return;
            }

            try {
                const userResponse = await axios.get(
                    "http://localhost:8000/api/v1/users/current-user",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                setUserData({
                    fullName: userResponse.data.data.fullName,
                    username: userResponse.data.data.username,
                    avatar: userResponse.data.data.avatar,
                });

                const historyResponse = await axios.get(
                    "http://localhost:8000/api/v1/users/watch-history",
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                setWatchHistory(historyResponse.data.data);

                const Playlists = await axios.get(
                    `http://localhost:8000/api/v1/playlist/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                }
                );

                setPlaylist(Playlists.data.data);

            } catch (err) {
                console.error("Fetch error:", err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDataAndHistory();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <Header />
            <div className='p-20 max-w-screen bg-[#0f0f0f]'>
                <div className='ml-8'>
                    <div className="flex items-center m-2 mt-2">
                        <img
                            src={userData?.avatar || "/default-avatar.png"}
                            className="w-30 h-30 rounded-full cursor-pointer"
                        />
                        <div onClick={handleChannel} className="ml-4 mb-10">
                            <p className="font-bold text-4xl cursor-pointer text-[#f2f2f2]">{userData?.fullName}</p>
                            <p className="cursor-pointer pt-1 text-[#ababab]">@{userData?.username} • <span>View channel</span></p>
                        </div>
                    </div>

                    {/* Watch History Section */}
                    <div className='ml-3 py-6 flex items-center justify-between'>
                        <h3 className='text-xl font-bold cursor-pointer text-[#f2f2f2]'>History</h3>
                        <button className='px-4 py-2 border-[1px] border-[#f2f2f241] rounded-full cursor-pointer hover:bg-[#f2f2f241]'>View all</button>
                    </div>
                    <div className='flex items-center max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden'>
                        {watchHistory.slice(0, 8).map((video) => (
                            <SmallVideoCard
                                key={video._id}
                                video={video}
                                mainDiv={"w-[400px] m-1 rounded-md flex flex-col shadow-lg relative cursor-pointer"}
                                imgDiv={"relative "}
                                imgelem={"w-[380px] h-[140px] rounded-md flex flex-col shadow-lg relative cursor-pointer"}
                                textelem={"w-[250px] p-2"}
                                channel={{ data: video.owner }}
                            />
                        ))}
                    </div>
                    <div className='ml-3 py-6 flex items-center justify-between'>
                        <h3 className='text-xl font-bold cursor-pointer text-[#f2f2f2]'>Playlists</h3>
                        <button className='px-4 py-2 border-[1px] border-[#f2f2f241] rounded-full cursor-pointer hover:bg-[#f2f2f241]'>View all</button>
                    </div>
                    <div className='flex items-center overflow-x-auto [&::-webkit-scrollbar]:hidden'>
                        {playlist.slice(0, 8).map((item) => (
                            <PlaylistCard
                                key={item._id}
                                playlist={item}
                            />
                        ))}
                    </div>
                    <div className='ml-3 py-6 flex items-center justify-between'>
                        <h3 className='text-xl font-bold cursor-pointer text-[#f2f2f2]'>Watch Later</h3>
                        <button className='px-4 py-2 border-[1px] border-[#f2f2f241] rounded-full cursor-pointer hover:bg-[#f2f2f241]'>View all</button>
                    </div>
                    <div className='flex items-center overflow-x-auto'>
                        {watchHistory.slice(0, 8).map((video) => (
                            <SmallVideoCard
                                key={video._id}
                                video={video}
                                clas={"flex-col w-[600px] gap-0"}
                                imgWidth={""}
                                textWidth={""}
                                channel={{ data: video.owner }}
                            />
                        ))}
                    </div>
                    <div className='ml-3 py-6 flex items-center justify-between'>
                        <h3 className='text-xl font-bold cursor-pointer text-[#f2f2f2]'>Liked videos</h3>
                        <button className='px-4 py-2 border-[1px] border-[#f2f2f241] rounded-full cursor-pointer hover:bg-[#f2f2f241]'>View all</button>
                    </div>
                    <div className='flex items-center overflow-x-auto'>
                        {watchHistory.slice(0, 8).map((video) => (
                            <SmallVideoCard
                                key={video._id}
                                video={video}
                                clas={"flex-col w-[600px] gap-0"}
                                imgWidth={""}
                                textWidth={""}
                                channel={{ data: video.owner }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
