import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BiLike, BiDislike } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { TbShare3 } from "react-icons/tb";
import millify from "millify";
import VideoDescription from "../components/VideoDescription";
import ShareComponent from "./ShareComponent";

const VideoInfoCard = ({ videoDetails }) => {
  const [channelDetails, setChannelDetails] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isShare, setIsShare] = useState(false);
  const [isSameUser, setIsSameUser] = useState(true);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const shareRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setIsShare(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!videoDetails?._id) return;

    const fetchVideoAndChannel = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const headers = { Authorization: `Bearer ${token}` };
        const channelId = videoDetails.owner;

        setIsSameUser(userId !== channelId);

        const [channelRes, subRes, likesRes] = await Promise.all([
          axios.get(`http://localhost:8000/api/v1/users/c/${channelId}`, { headers }),
          token
            ? axios.get(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, { headers })
            : Promise.resolve({ data: { data: [] } }),
          axios.get(`http://localhost:8000/api/v1/likes/total/v/${videoDetails._id}`, { headers })
        ]);

        setChannelDetails(channelRes.data);
        setLikes(likesRes.data.totalLikes);

        if (token) {
          const isUserSubscribed = subRes.data.data.some(
            (sub) => sub.subscriber._id === userId
          );
          setIsSubscribed(isUserSubscribed);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        alert("Failed to fetch data. Please try again.");
      }
    };

    fetchVideoAndChannel();
  }, [videoDetails, userId]);

  const handleSubscriptionToggle = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return alert("You need to log in to subscribe.");

      const headers = { Authorization: `Bearer ${token}` };
      const channelId = channelDetails?.data?._id;
      if (!channelId) return console.error("Channel ID not found.");

      await axios.post(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, {}, { headers });
      setIsSubscribed(!isSubscribed);
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return alert("You need to log in to like this video.");

      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(`http://localhost:8000/api/v1/likes/toggle/v/${videoDetails._id}`, {}, { headers });

      // Update UI optimistically
      setHasLiked(!hasLiked);
      setLikes((prevLikes) => (hasLiked ? prevLikes - 1 : prevLikes + 1));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading) return <div className="text-white p-4 text-center">Loading...</div>;

  if (!videoDetails || !channelDetails) {
    return (
      <div className="bg-white dark:bg-black text-black dark:text-white p-4">
        Video or Channel not found.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0f0f0f] text-black dark:text-white p-4 w-3xl">
      <h2 className="text-lg font-semibold mb-2">{videoDetails.title}</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={channelDetails.data.avatar || "/default-avatar.png"}
            className="w-10 h-10 rounded-full cursor-pointer"
            alt="Channel Avatar"
          />
          <div className="ml-3">
            <p className="font-bold cursor-pointer">{channelDetails.data.username}</p>
            <p className="text-gray-400 text-sm">
              {millify(channelDetails.data.subscribersCount || 0)} subscribers
            </p>
          </div>

          {isSameUser && (
            <button
              className={`ml-4 px-4 py-2 rounded-full cursor-pointer font-semibold ${
                isSubscribed ? "bg-[#262626] text-white" : "bg-white text-black"
              }`}
              onClick={handleSubscriptionToggle}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-[#262626] rounded-full">
            <button
              className={`flex items-center cursor-pointer px-4 py-2 rounded-tl-full rounded-bl-full ${
                hasLiked ? "bg-blue-600" : "bg-[#262626] hover:bg-[#4e4e4ec7]"
              } text-white`}
              onClick={handleLikeToggle}
            >
              <BiLike className="mr-2" /> {millify(likes)}
            </button>
            <hr className="w-px h-6 my-2 bg-gray-400" />
            <button className="bg-[#262626] p-3 cursor-pointer rounded-tr-full rounded-br-full hover:bg-[#4e4e4ec7] text-white">
              <BiDislike />
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsShare((prev) => !prev)}
              className="flex items-center bg-[#262626] px-4 py-2 rounded-full cursor-pointer hover:bg-[#4e4e4ec7] text-white"
            >
              <TbShare3 className="mr-2" /> Share
            </button>

            {isShare && (
              <div className="absolute top-full mt-2 right-0 z-10 p-3 rounded-lg shadow-lg">
                <ShareComponent />
              </div>
            )}
          </div>

          <button className="bg-[#262626] p-3 cursor-pointer rounded-full hover:bg-[#4e4e4ec7] text-white">
            <BsThreeDots />
          </button>
        </div>
      </div>

      <VideoDescription videoInfo={videoDetails} channelInfo={channelDetails} />
    </div>
  );
};

export default VideoInfoCard;
