import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { BiLike,BiDislike } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import VideoDescription from '../components/VideoDescription'

const VideoInfoCard = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;

    const fetchVideoAndChannel = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        // Fetch video details
        const videoRes = await axios.get(`http://localhost:8000/api/v1/videos/${videoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const videoData = videoRes.data;
        setVideoDetails(videoData);

        // Fetch channel details
        const channelId = videoData.data.owner;

        const channelRes = await axios.get(`http://localhost:8000/api/v1/users/c/${channelId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChannelDetails(channelRes.data);

        if (token) {
          const subRes = await axios.get(`http://localhost:8000/api/v1/subscriptions/c/${channelId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsSubscribed(subRes.data.isSubscribed);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchVideoAndChannel();
  }, [videoId]);

  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  if (!videoDetails || !channelDetails) {
    return <div className="text-white p-4">Video or Channel not found.</div>;
  }

  return (
    <div className="bg-[#181818] text-white p-4 w-3xl">
      <h2 className="text-lg font-semibold mb-2">{videoDetails.data.title}</h2>
      <div className=" flex justify-between">
        <div className="flex items-center">
          <img
            src={channelDetails.data.avatar || "/default-avatar.png"}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="font-bold">{channelDetails.data.username}</p>
            <p className="text-gray-400 text-sm">{channelDetails.data.subscribers || 0} subscribers</p>
          </div>

          <button
            className={`ml-4 px-4 py-2 rounded-full font-semibold ${isSubscribed ? "bg-[#262626] text-white" : "bg-white text-black"
              }`}
            onClick={() => console.log("Subscribe/Unsubscribe")}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-[#262626] rounded-full">
            <button className="flex items-center bg-[#262626] hover:bg-[#4e4e4ec7] px-4 py-2 rounded-tl-full rounded-bl-full text-white">
              <BiLike className="mr-2" /> {videoDetails.likes || 1500}
            </button>
            <hr className="w-px h-6 my-2 relative right-0 bg-gray-400 text-transparent"/>
            <button className="bg-[#262626] p-3 rounded-tr-full rounded-br-full  hover:bg-[#4e4e4ec7] text-white">
              <BiDislike />
            </button>
          </div>
          <button className="flex items-center bg-[#262626] px-4 py-2 rounded-full  hover:bg-[#4e4e4ec7] text-white">
            <TbShare3 className="mr-2" /> Share
          </button>

          {/* More Options Button */}
          <button className="bg-[#262626] p-3 rounded-full hover:bg-[#4e4e4ec7] text-white">
            <BsThreeDots />
          </button>
        </div>

      </div>
      <VideoDescription videoInfo={videoDetails} channelInfo={channelDetails} />
    </div>
  );
};

export default VideoInfoCard;
