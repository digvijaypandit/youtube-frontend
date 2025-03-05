import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import PlaylistCard from '../components/PlaylistCard';
import Header from '../components/header/Header';

const UaerPlaylists = () => {
    const { username } = useParams();
    const [playlist, setPlaylist] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;

    useEffect(() => {
        const fetchPlaylists = async () => {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) {
                console.error('Access token not found.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/playlist/user/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        },
                    }
                );
                setPlaylist(response.data.data);
            } catch (error) {
                console.error('Error fetching playlists:', error.response?.data || error);
            } finally {
                setLoading(false);
            }
        };

        fetchPlaylists();
    }, [userId]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className='p-14 max-w-screen bg-[#0f0f0f]'>
                <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
                    {/* Playlist Content */}
                    <div className="p-6 text-center flex">
                        {playlist.length > 0 ? (
                            playlist.map((item) => (
                                <div key={item._id} >
                                    <PlaylistCard playlist={item} />
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No playlists available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UaerPlaylists;
