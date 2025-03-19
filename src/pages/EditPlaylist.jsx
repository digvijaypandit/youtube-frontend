import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Header from '../components/header/Header';

const EditPlaylist = () => {
    const { playlistId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState('');

    const accessToken = localStorage.getItem('accessToken');

    // Fetch playlist data
    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/playlist/${playlistId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const { name, description } = response.data.data;
                setFormData({ name, description });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching playlist:', error);
                setMessage('Failed to fetch playlist details.');
                setLoading(false);
            }
        };

        fetchPlaylistData();
    }, [playlistId, accessToken]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit updated playlist data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            await axios.patch(
                `http://localhost:8000/api/v1/playlist/${playlistId}`,
                JSON.stringify(formData),
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setMessage('Playlist updated successfully!');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Update error:', error);
            setMessage(error.response?.data?.message || 'Update failed. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    // Handle delete playlist
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this playlist?')) {
            try {
                await axios.delete(`http://localhost:8000/api/v1/playlist/${playlistId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setMessage('Playlist deleted successfully!');
                setTimeout(() => navigate('/'), 2000);
            } catch (error) {
                console.error('Delete error:', error);
                setMessage('Delete failed. Please try again.');
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f]">
                <ClipLoader color="#ffffff" size={50} />
            </div>
        );
    }

    return (
        <>
            <Header hiddensidebar />
            <div className="p-6 md:p-14 bg-[#0f0f0f] min-h-screen">
                <div className="max-w-4xl mx-auto bg-[#1a1a1a] rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Edit Playlist</h2>

                    <label className="block mb-2 text-gray-300">Playlist Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter playlist name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 text-white"
                        required
                    />

                    <label className="block mb-2 text-gray-300">Description:</label>
                    <textarea
                        name="description"
                        placeholder="Enter playlist description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border rounded-md h-32 focus:outline-none focus:border-blue-500 bg-gray-800 text-white"
                        required
                    />

                    <div className="flex justify-end space-x-2">
                        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            {updating ? 'Updating...' : 'Save'}
                        </button>
                        <button onClick={() => window.location.reload()} className="bg-gray-600 text-white px-4 py-2 rounded-lg">
                            Undo Changes
                        </button>
                        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg">
                            Delete
                        </button>
                    </div>

                    {message && <p className="text-white mt-4">{message}</p>}
                </div>
            </div>
        </>
    );
};

export default EditPlaylist;
