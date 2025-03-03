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
  const shareRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setIsShare(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!videoDetails?._id) return;

    const fetchVideoAndChannel = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;
        const headers = { Authorization: `Bearer ${token}` };

        const channelId = videoDetails.owner;
        const channelRes = await axios.get(
          `http://localhost:8000/api/v1/users/c/${channelId}`,
          { headers }
        );
        setChannelDetails(channelRes.data);

        if (token) {
          const subRes = await axios.get(
            `http://localhost:8000/api/v1/subscriptions/c/${channelId}`,
            { headers }
          );
          const isUserSubscribed = subRes.data.data.some(
            (sub) => sub.subscriber._id === userId
          );
          setIsSubscribed(isUserSubscribed);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchVideoAndChannel();
  }, [videoDetails, isSubscribed]);

  const handleSubscriptionToggle = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You need to log in to subscribe.");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const channelId = channelDetails?.data?._id;

      if (!channelId) {
        console.error("Channel ID not found.");
        return;
      }

      await axios.post(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, {}, { headers });

      const subRes = await axios.get(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, { headers });
      const isUserSubscribed = subRes.data.data.some(
        (sub) => sub.subscriber._id === JSON.parse(localStorage.getItem("user"))?._id
      );

      setIsSubscribed(isUserSubscribed);
    } catch (error) {
      console.error("Error toggling subscription:", error);
    }
  };


  if (loading) return <div className="text-white p-4">Loading...</div>;

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

          <button
            className={`ml-4 px-4 py-2 rounded-full cursor-pointer font-semibold ${isSubscribed ? "bg-[#262626] text-white" : "bg-white text-black"
              }`}
            onClick={handleSubscriptionToggle}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-[#262626] rounded-full">
            <button className="flex items-center cursor-pointer bg-[#262626] hover:bg-[#4e4e4ec7] px-4 py-2 rounded-tl-full rounded-bl-full text-white">
              <BiLike className="mr-2" /> {millify(videoDetails.likes || 1500)}
            </button>
            <hr className="w-px h-6 my-2 bg-gray-400" />
            <button className="bg-[#262626] p-3 cursor-pointer rounded-tr-full rounded-br-full hover:bg-[#4e4e4ec7] text-white">
              <BiDislike />
            </button>
          </div>

          <div className="flex items-center justify-center" ref={shareRef}>
          <button
            onClick={() => setIsShare((prev) => !prev)}
            className="flex items-center bg-[#262626] px-4 py-2 rounded-full cursor-pointer hover:bg-[#4e4e4ec7] text-white"
          >
            <TbShare3 className="mr-2" /> Share
          </button>

            {isShare && (
              <div className="bg-white dark:bg-black shadow-lg p-4 rounded-md">
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
