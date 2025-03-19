import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { useLocation } from "react-router-dom";
import { LuListPlus } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";

const PlaylistMenu = () => {
    const [playlists, setPlaylists] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const videoId = location.state?.videoId;

    if (!videoId) {
        return <p className="text-red-500 text-center mt-10">Error: Video ID is missing</p>;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (!user || !accessToken) {
            setError("You are not authorized. Please log in again.");
            return;
        }

        const fetchPlaylists = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/v1/playlist/user/${user._id}`,
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                );

                if (response.data.success) {
                    setPlaylists(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching playlists:", error);
                setError("Failed to fetch playlists.");
            }
        };

        fetchPlaylists();
    }, [user?._id, accessToken]);

    const handleCheckboxChange = (playlistId) => {
        setSelectedPlaylists((prev) =>
            prev.includes(playlistId) ? prev.filter((id) => id !== playlistId) : [...prev, playlistId]
        );
    };

    const saveToPlaylists = async () => {
        try {
            await Promise.all(
                selectedPlaylists.map(async (playlistId) => {
                    await axios.patch(
                        `http://localhost:8000/api/v1/playlist/add/${videoId}/${playlistId}`,
                        {},
                        { headers: { Authorization: `Bearer ${accessToken}` } }
                    );
                })
            );

            console.log("Video added to selected playlists.");
            handleClose();
        } catch (error) {
            console.error("Error adding video:", error);
            setError("Failed to add video to playlists.");
        }
    };

    const handleClose = () => {
        navigate("/");
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#181818] text-white p-6 rounded-xl shadow-lg w-96">
                {/* Title with Close Button */}
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Save video to...</h3>
                    <button onClick={handleClose} className="text-gray-400 cursor-pointer hover:text-gray-200 text-lg">
                        <RxCross2/>
                    </button>
                </div>

                {/* Playlist Selection List */}
                <div className="mt-4 max-h-[200px] overflow-y-auto scrollbar-hide">
                    {playlists.map((playlist) => (
                        <label
                            key={playlist._id}
                            className="flex items-center justify-between bg-transparent p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition"
                        >
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 accent-gray-500"
                                    checked={selectedPlaylists.includes(playlist._id)}
                                    onChange={() => handleCheckboxChange(playlist._id)}
                                />
                                <span className="text-white">{playlist.name}</span>
                            </div>
                            <MdOutlinePlaylistAddCheck className="text-gray-500 text-sm" />
                        </label>
                    ))}
                </div>

                {/* Create Playlist Button */}
                <button
                    className="w-full p-3 mt-4 bg-[#383838] rounded-full cursor-pointer hover:bg-[#4d4d4d] transition flex items-center justify-center text-white text-lg"
                    onClick={() => setShowCreateModal(true)}
                >
                    <LuListPlus /> <span className="px-2">New Playlist</span>
                </button>

                {/* Save Button */}
                <button
                    className="w-full p-3 mt-3 bg-[#383838] hover:bg-[#4d4d4d] rounded-full cursor-pointer text-white"
                    onClick={saveToPlaylists}
                >
                    Save
                </button>
            </div>

            {/* Modal for Creating a New Playlist */}
            {showCreateModal && <CreatePlaylistModal userId={user._id} onClose={() => setShowCreateModal(false)} />}
        </div>
    );
};

export default PlaylistMenu;
