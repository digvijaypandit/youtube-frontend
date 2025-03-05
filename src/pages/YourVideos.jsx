import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoThumbnail from '../components/VideoThumbnail';
import Header from '../components/header/Header';

const YourVideos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/videos/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
                );
                if (response.data.success) {
                    setVideos(response.data.data);
                } else {
                    setError('Failed to fetch videos');
                }
            } catch (err) {
                setError('Error fetching videos');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [userId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center mt-10">{error}</div>;
    }

    return (
        <div>
            <Header />
            <div className='p-14 max-w-screen bg-[#0f0f0f]'>
                <div className="flex flex-wrap gap-4 p-5  bg-white dark:bg-[#0f0f0f] text-black dark:text-white">
                    {videos.map((video) => (
                        <div className='w-full sm:w-[48%] md:w-[48%] lg:w-[32%] xl:w-[32%] 2xl:w-[15%] p-2'>
                            <VideoThumbnail key={video._id} video={video} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YourVideos;
