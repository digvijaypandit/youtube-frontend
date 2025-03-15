import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";

const Subscriptions = () => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggleState, setToggleState] = useState({});
    const [isSortedAZ, setIsSortedAZ] = useState(true); // State for sorting order
    const user = JSON.parse(localStorage.getItem("user"));
    const subscriberId = user._id;
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/subscriptions/u/${subscriberId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );
                if (response.data.success) {
                    const sortedData = response.data.data.sort((a, b) =>
                        a.channel.username.localeCompare(b.channel.username)
                    );
                    setChannels(sortedData);

                    const initialToggleState = {};
                    sortedData.forEach((item) => {
                        initialToggleState[item.channel._id] = true;
                    });
                    setToggleState(initialToggleState);
                }
            } catch (error) {
                console.error("Failed to fetch subscriptions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubscriptions();
    }, [subscriberId]);

    // Sorting function
    const sortChannels = () => {
        const sorted = [...channels].sort((a, b) => {
            return isSortedAZ
                ? b.channel.username.localeCompare(a.channel.username) // Z-A if true
                : a.channel.username.localeCompare(b.channel.username); // A-Z if false
        });
        setChannels(sorted);
        setIsSortedAZ(!isSortedAZ);
    };

    const toggleSubscription = async (channelId) => {
        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/subscriptions/c/${channelId}`,
                {}, // Empty body
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            if (response.data.success) {
                setToggleState((prevState) => ({
                    ...prevState,
                    [channelId]: !prevState[channelId],
                }));
            }
        } catch (error) {
            console.error("Failed to toggle subscription:", error);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className='p-14 max-w-screen bg-[#0f0f0f]'>
                <div className="min-h-screen bg-[#0f0f0f] text-white py-8">
                    <h1 className="text-3xl font-bold text-center mb-8">All subscriptions</h1>
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="flex justify-start mb-4">
                            <button
                                className="px-4 py-2 bg-[#262626] rounded-md"
                                onClick={sortChannels}
                            >
                                {isSortedAZ ? "A-Z" : "Z-A"}
                            </button>
                        </div>
                        <div className="space-y-6">
                            {channels.map((item) => {
                                const isSubscribed = toggleState[item.channel._id];
                                return (
                                    <div
                                        key={item.channel._id}
                                        className="flex items-center space-x-4 bg-[#313131] p-4 rounded-md"
                                    >
                                        <img
                                            src={item.channel.avatar}
                                            alt={item.channel.username}
                                            className="w-16 h-16 rounded-full"
                                        />
                                        <Link to={`/channel/${item.channel.username}`} className="flex-1">
                                            <h2 className="text-xl font-semibold">{item.channel.username}</h2>
                                            <p className="text-gray-400">@{item.channel.fullName}</p>
                                        </Link>
                                        <button
                                            className={`cursor-pointer flex items-center px-4 py-2 rounded-md transition ${isSubscribed
                                                    ? "bg-[#454545] text-white"
                                                    : "bg-[red] text-white"
                                                }`}
                                            onClick={() => toggleSubscription(item.channel._id)}
                                        >
                                            {isSubscribed ? "Subscribed" : "Subscribe"}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Subscriptions;