import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChannelPage = () => {
    const { username } = useParams();
    const [channelData, setChannelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sameUser, setSameUser] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [userVideos, setUserVideos] = useState([]);

    // Fetch user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;

    // Fetch channel data based on the username in the URL
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
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (response.data.success) {
                    setChannelData(response.data.data);
                }

                const channelId = response.data.data._id;
                const subRes = await axios.get(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                const isUserSubscribed = subRes.data.data.some(
                    (sub) => sub.subscriber._id === userId
                );
                setIsSubscribed(isUserSubscribed);

                const userVideosRes = await axios.get(`http://localhost:8000/api/v1/videos/user/${channelId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                setUserVideos(userVideosRes.data.data);
                console.log('User videos:', userVideosRes.data.data);

            } catch (error) {
                console.error('Error fetching channel data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChannelData();
    }, [username, userId]);

    useEffect(() => {
        if (channelData && user) {
            setSameUser(user.username !== channelData.username);
        }
    }, [channelData, user]);

    const handleSubscriptionToggle = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                alert('You need to log in to subscribe.');
                return;
            }

            const headers = { Authorization: `Bearer ${accessToken}` };
            const channelId = channelData?._id;

            if (!channelId) {
                console.error('Channel ID not found.');
                return;
            }

            // Subscribe or Unsubscribe API call
            await axios.post(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, {}, { headers });

            // Check updated subscription status
            const subRes = await axios.get(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, { headers });
            const isUserSubscribed = subRes.data.data.some(
                (sub) => sub.subscriber._id === userId
            );

            setIsSubscribed(isUserSubscribed);
        } catch (error) {
            console.error('Error toggling subscription:', error);
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
                                {subscribersCount.toLocaleString()} subscribers • Subscribed to {channelsSubscribedToCount} channels
                            </p>
                        </div>
                    </div>
                    {sameUser && (
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
                    <li className="cursor-pointer hover:text-white">Home</li>
                    <li className="cursor-pointer hover:text-white">Videos</li>
                    <li className="cursor-pointer hover:text-white">Shorts</li>
                    <li className="cursor-pointer hover:text-white">Live</li>
                    <li className="cursor-pointer hover:text-white">Playlists</li>
                    <li className="cursor-pointer hover:text-white">About</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="p-6 text-center">
                <h2 className="text-xl font-semibold mb-4">Recent Videos</h2>
                <p className="text-gray-500">No videos uploaded yet.</p>
            </div>
        </div>
    );
};

export default ChannelPage;
