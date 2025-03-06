import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import Header from '../components/header/Header';

const EditVideo = () => {
    const { videoId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        description: '',
        title: '',
        thumbnail: null,
    });
    const [visibility, setVisibility] = useState('private');
    const [oldThumbnail, setOldThumbnail] = useState(null);
    const [newThumbnailPreview, setNewThumbnailPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState('');

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/videos/${videoId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const { title, description, thumbnail, link, filename, quality, visibility: videoVisibility } = response.data.data;
                setFormData({ title, description, thumbnail: null });
                setOldThumbnail(thumbnail);
                setVisibility(videoVisibility);  // Set visibility state
                setLoading(false);
            } catch (error) {
                console.error('Error fetching video data:', error);
                setMessage('Failed to fetch video details.');
                setLoading(false);
            }
        };

        fetchVideoData();
    }, [videoId, accessToken]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            setFormData({ ...formData, [name]: file });
            setNewThumbnailPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle visibility change
    const handleMenuChange = async (event) => {
        const newVisibility = event.target.value;
        setVisibility(newVisibility);
    
        try {
            const visibilityData = await axios.patch(
                `http://localhost:8000/api/v1/videos/toggle/publish/${videoId}`,
                JSON.stringify({ value: newVisibility }),
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setMessage('Update successful!');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Update error:', error);
            setMessage('Failed to update visibility.');
        }
    };
    

    // Submit form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        if (formData.thumbnail) {
            data.append('thumbnail', formData.thumbnail);
        }

        try {
            // API call for title, description, and thumbnail
            await axios.patch(`http://localhost:8000/api/v1/videos/${videoId}`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Update successful!');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('Update error:', error);
            setMessage(error.response?.data?.message || 'Update failed. Please try again.');
        } finally {
            setUpdating(false);
        }
    };

    // Handle delete video
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this video?")) {
            try {
                await axios.delete(`http://localhost:8000/api/v1/videos/${videoId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                setMessage('Video deleted successfully!');
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
                <div className="max-w-6xl mx-auto bg-[#0f0f0f] rounded-lg shadow-lg p-6 grid grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Video details</h2>

                        <label className="block mb-2 text-gray-700">Title:</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter video title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                            required
                        />

                        <label className="block mb-2 text-gray-700">Description:</label>
                        <textarea
                            name="description"
                            placeholder="Enter video description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border rounded-md h-48 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="relative">
                        <div className="flex justify-end space-x-2 mb-2">
                            <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save</button>
                            <button onClick={() => window.location.reload()} className="bg-gray-600 text-white px-4 py-2 rounded-lg">Undo Changes</button>
                            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                        </div>

                        <img src={newThumbnailPreview || oldThumbnail} alt="Thumbnail" className="w-full h-64 object-cover rounded-lg mb-2 border" />
                        <label className="relative bottom-6 left-1 bg-transparent bg-opacity-50 text-white p-1 rounded-full cursor-pointer">
                            <AiOutlineEdit className="text-xl" />
                            <input type="file" name="thumbnail" accept="image/*" onChange={handleChange} className="hidden" />
                        </label>

                        <div className="max-w-xs border rounded-lg p-2 bg-gray-900">
                            <label htmlFor="visibility" className="block text-xs text-gray-500 mb-1">Visibility</label>
                            <select id="visibility" value={visibility} onChange={handleMenuChange} className="w-full bg-gray-900 rounded-2xl text-sm text-gray-200">
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditVideo;
