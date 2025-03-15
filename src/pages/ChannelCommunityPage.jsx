import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header/Header';
import millify from 'millify';

const ChannelCommunityPage = () => {
    const { username } = useParams();
    const [channelData, setChannelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sameUser, setSameUser] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [userTweets, setUserTweets] = useState([]);
    const [tweetsLoading, setTweetsLoading] = useState(true);

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
                }

                const channelId = response.data.data._id;

                const subRes = await axios.get(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                const isUserSubscribed = subRes.data.data.some(
                    (sub) => sub.subscriber._id === userId
                );
                setIsSubscribed(isUserSubscribed);

                const userTweetsRes = await axios.get(`http://localhost:8000/api/v1/tweets/user/${channelId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                setUserTweets(userTweetsRes.data.data);

            } catch (error) {
                console.error('Error fetching channel data:', error.response?.data || error);
            } finally {
                setLoading(false);
                setTweetsLoading(false);
            }
        };

        fetchChannelData();
    }, [username, userId, isSubscribed]);

    useEffect(() => {
        if (channelData && user) {
            setSameUser(user.username === channelData.username);
        }
    }, [channelData, user]);

    if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;

    if (!channelData) {
        return <div className="flex justify-center items-center h-screen text-white">Failed to load channel data.</div>;
    }

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
                    <div className="relative top-0 left-0 w-full h-80">
                        <div
                            style={{ backgroundImage: `url(${coverImage})` }}
                            className="relative bg-cover bg-center rounded-2xl top-0 left-0 w-[85%] sm:h-20 md:h-40 lg:60 bg-white mx-20"
                        ></div>
                        <div className="absolute inset-0 top-40 flex items-center justify-between px-10">
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
                                        {millify(subscribersCount?.toLocaleString()) || 0} subscribers •
                                    </p>
                                    {sameUser && <h6 className="text-gray-400">Subscribed {channelsSubscribedToCount || 0}</h6>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-2 border-b sticky top-18 z-30 bg-[#0f0f0f] border-[#404040]">
                        <ul className="flex justify-start mx-10 space-x-8 text-gray-400 font-medium">
                            <NavLink
                                to={`/channel/${channelData.username}`}
                                className={({ isActive }) => isActive ? 'text-white cursor-pointer' : 'hover:text-white cursor-pointer'}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to={`/channel/${channelData.username}/videos`}
                                className={({ isActive }) => isActive ? 'text-white cursor-pointer' : 'hover:text-white cursor-pointer'}
                            >
                                Videos
                            </NavLink>
                            <NavLink
                                to={`/channel/${channelData.username}/community`}
                                className={({ isActive }) => isActive ? 'text-white cursor-pointer' : 'hover:text-white cursor-pointer'}
                            >
                                Posts
                            </NavLink>
                            <NavLink
                                to={`/channel/${channelData.username}/playlists`}
                                className={({ isActive }) => isActive ? 'text-white cursor-pointer' : 'hover:text-white cursor-pointer'}
                            >
                                Playlists
                            </NavLink>
                        </ul>
                    </div>

                    <div className="p-6 text-center">
                        {tweetsLoading ? (
                            <p className="text-gray-500">Loading tweets...</p>
                        ) : userTweets.length > 0 ? (
                            <div className='flex flex-wrap items-center overflow-y-auto p-2 m-8 max-w-screen'>
                                {userTweets.map((tweet) => (
                                    <div key={tweet._id} className="w-[300px] m-4 p-4 rounded-xl bg-[#1f1f1f] shadow-lg relative">
                                        <p className="text-white">{tweet.content}</p>
                                        <div className="text-gray-400 text-sm mt-2">
                                            <span>@{tweet.user.username}</span> • <span>{new Date(tweet.createdAt).toLocaleDateString()}</span>
                                            {sameUser && (
                                                <NavLink to={`/edits/post/${tweet._id}`} className="absolute right-0 top-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M17.414 2.586a2 2 0 010 2.828l-1.828 1.828-2.828-2.828 1.828-1.828a2 2 0 012.828 0zM11.172 6l-8.293 8.293A1 1 0 002 15v3h3a1 1 0 00.707-.293L14 8.828l-2.828-2.828z" />
                                                    </svg>
                                                </NavLink>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                        ) : (
                            <p className="text-gray-500">No tweets available yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChannelCommunityPage;
