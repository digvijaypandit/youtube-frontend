import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import SmallVideoCard from '../components/SmallVideoCard';
import Header from '../components/header/Header'

const ChannelPage = () => {
    const { username } = useParams();
    const [channelData, setChannelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sameUser, setSameUser] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [userVideos, setUserVideos] = useState([]);
    const [videosLoading, setVideosLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;

    useEffect(() => {
        const fetchChannelData = async () => {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('Access token not found.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/api/v1/users/c/${username}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (response.data.success) {
                    setChannelData(response.data.data);
                    console.log("Channel data loaded:", response.data.data);
                }

                const channelId = response.data.data._id;

                // Fetch subscription status
                const subRes = await axios.get(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                const isUserSubscribed = subRes.data.data.some(
                    (sub) => sub.subscriber._id === userId
                );
                setIsSubscribed(isUserSubscribed);

                // Fetch user videos
                const userVideosRes = await axios.get(`http://localhost:8000/api/v1/videos/user/${channelId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                setUserVideos(userVideosRes.data.data);

            } catch (error) {
                console.error('Error fetching channel data:', error.response?.data || error);
            } finally {
                setLoading(false);
                setVideosLoading(false);
            }
        };

        fetchChannelData();
    }, [username, userId, isSubscribed]);

    useEffect(() => {
        if (channelData && user) {
            setSameUser(user.username === channelData.username);
        }
    }, [channelData, user]);

    // Handle subscription toggle
    const handleSubscriptionToggle = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                alert('You need to log in to subscribe.');
                return;
            }

            if (!channelData) {
                console.error('Channel data not loaded.');
                return;
            }

            const headers = { Authorization: `Bearer ${accessToken}` };
            const channelId = channelData._id;

            // Subscribe or Unsubscribe API call
            await axios.post(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, {}, { headers });

            // Check updated subscription status
            const subRes = await axios.get(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, { headers });
            const isUserSubscribed = subRes.data.data.some((sub) => sub.subscriber._id === userId);

            setIsSubscribed(isUserSubscribed);
        } catch (error) {
            console.error('Error toggling subscription:', error.response?.data || error);
        }
    };

    // Show loading state
    if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;

    // Show error if channel data fails to load
    if (!channelData) {
        return <div className="flex justify-center items-center h-screen text-white">Failed to load channel data.</div>;
    }

    // Destructure channel data for easier access
    const {
        fullName,
        avatar,
        coverImage,
        subscribersCount,
        channelsSubscribedToCount,
    } = channelData;

    return (
        <>
            <Header />
            <div className='p-14 max-w-screen bg-[#0f0f0f]'>
                <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
                    {/* Channel cover image */}
                    <div className="relative top-0 left-0 w-full h-80">
                        <div
                            style={{ backgroundImage: `url(${coverImage})` }}
                            className="relative bg-cover bg-center rounded-2xl top-0 left-0 w-[85%] sm:h-20 md:h-40 lg:60 bg-white mx-20"
                        ></div>
                        <div className="absolute inset-0 top-40 flex items-center justify-between px-10">
                            {/* Channel avatar and info */}
                            <div className="flex items-center space-x-4">
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                                />
                                <div>
                                    <h1 className="text-3xl font-bold">{fullName}</h1>
                                    <p className="text-lg">@{channelData.username}</p>
                                    <p className="text-gray-400">
                                        {subscribersCount?.toLocaleString() || 0} subscribers • Subscribed to {channelsSubscribedToCount || 0} channels
                                    </p>
                                </div>
                            </div>
                            {!sameUser && (
                                <div className="text-right">
                                    <button
                                        className={`px-6 py-2 rounded ${isSubscribed ? 'bg-gray-400' : 'bg-red-600'} text-white font-medium`}
                                        onClick={handleSubscriptionToggle}
                                    >
                                        {isSubscribed ? 'Subscribed' : 'Subscribe'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="mt-8 border-b border-gray-700">
                        <ul className="flex justify-center space-x-8 text-gray-400 font-medium">
                            <Link to={`/channel/${channelData.username}`} className="cursor-pointer hover:text-white">Home</Link>
                            <Link to={`/channel/${channelData.username}/videos`} className="cursor-pointer hover:text-white">Videos</Link>
                            <Link to={`/channel/${channelData.username}/playlists`} className="cursor-pointer hover:text-white">Posts</Link>
                            <Link to={`/channel/${channelData.username}/community`} className="cursor-pointer hover:text-white">Playlists</Link>
                        </ul>
                    </div>

                    {/* Main Content */}
                    <div className="p-6 text-center">
                        {videosLoading ? (
                            <p className="text-gray-500">Loading videos...</p>
                        ) : userVideos.length > 0 ? (
                            <div className='flex items-center max-h-[300px] p-2 m-2 max-w-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden'>
                                {userVideos.slice(0, 8).map((video) => (
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
                        ) : (
                            <p className="text-gray-500">No videos uploaded yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChannelPage;
