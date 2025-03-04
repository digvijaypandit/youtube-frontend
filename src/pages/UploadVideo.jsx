import React, { useState } from 'react';
import axios from 'axios';
import { IoMdCloudUpload, IoMdCloseCircleOutline } from "react-icons/io";

import Header from '../components/header/Header';
import { Link } from 'react-router-dom';

const UploadVideo = () => {
    const [formData, setFormData] = useState({
        description: '',
        title: '',
        userId: '',
        videoFile: null,
        thumbnail: null,
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            setFormData({ ...formData, videoFile: files[0] });
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setMessage('');
        setUploadProgress(0);

        const accessToken = localStorage.getItem('accessToken');

        const data = new FormData();
        data.append('description', formData.description);
        data.append('title', formData.title);
        data.append('userId', formData.userId);
        data.append('videoFile', formData.videoFile);
        data.append('thumbnail', formData.thumbnail);

        try {
            if (!accessToken) {
                setMessage("Unauthorized: No access token found.");
                return;
            }

            const response = await axios.post('http://localhost:8000/api/v1/videos/', data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                },
            });
            setMessage('Upload successful!');
            console.log('Upload success:', response.data);
        } catch (error) {
            setMessage('Upload failed. Please try again.');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <Header hiddensidebar={true} />
            <div className='p-14 bg-[#0f0f0f]'>
                    <div className="min-h-full text-white bg-gray-900 flex rounded-lg flex-col items-center justify-center py-10">
                        <div className='flex items-center justify-between w-full px-10 mb-4 rounded-lg m-2'>
                            <h2 className="text-2xl font-bold">Upload Videos</h2>
                            <Link to='/'>
                                <IoMdCloseCircleOutline className='text-3xl' />
                            </Link>
                        </div>
                        <div className="w-full items-center justify-around flex p-6 shadow-md">
                            <div>
                                <div
                                    className="border-2 border-dashed border-gray-600 p-6 mb-4 flex flex-col rounded-lg items-center justify-center cursor-pointer"
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                >
                                    <IoMdCloudUpload className="h-16 w-16 text-gray-500 mb-4" />
                                    <p className="text-gray-400 mb-2">Drag and drop video files to upload</p>
                                    <p className="text-gray-500 text-sm mb-4">
                                        Your videos will be private until you publish them.
                                    </p>
                                    <input
                                        type="file"
                                        name="videoFile"
                                        accept="video/*"
                                        onChange={handleChange}
                                        className="hidden"
                                        id="video-upload"
                                    />
                                    <label
                                        htmlFor="video-upload"
                                        className="bg-blue-600 px-4 py-2 rounded text-white cursor-pointer hover:bg-blue-700"
                                    >
                                        Select files
                                    </label>
                                </div>

                                {formData.videoFile && (
                                    <div className="mb-4 max-w-[400px]">
                                        <p className="text-gray-400">Selected file: {formData.videoFile.name}</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <form onSubmit={handleSubmit}>
                                    <label className="block mb-2 text-gray-400">Title:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Enter video title"
                                        className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
                                        required
                                    />

                                    <label className="block mb-2 text-gray-400">Description:</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Enter video description"
                                        className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
                                        required
                                    />

                                    <label className="block mb-2 text-gray-400">Thumbnail:</label>
                                    <input
                                        type="file"
                                        name="thumbnail"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
                                    />

                                    <button
                                        type="submit"
                                        className={`w-full py-2 rounded ${uploading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                                        disabled={uploading}
                                    >
                                        {uploading ? 'Uploading...' : 'Upload Video'}
                                    </button>

                                    {uploadProgress > 0 && (
                                        <div className="mt-4">
                                            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                                                <div
                                                    className="bg-blue-600 h-2.5 rounded-full"
                                                    style={{ width: `${uploadProgress}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-center text-gray-400">{uploadProgress}% uploaded</p>
                                        </div>
                                    )}

                                    {message && (
                                        <p className="mt-4 text-center text-gray-400">{message}</p>
                                    )}
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
        </>
    );
};

export default UploadVideo;
