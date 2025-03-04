import React, { useState } from 'react';
import axios from 'axios';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';

const UploadPost = () => {
  const [formData, setFormData] = useState({
    content: '',
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setMessage('Authentication required. Please log in.');
      setUploading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/Posts/', { content: formData.content }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setMessage('Post posted successfully!');
      setFormData({
        content: '',
      });
    } catch (error) {
      console.error('Upload error:', error);
      setMessage(error.response?.data?.detail || 'Failed to post Post.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className='p-14 bg-[#0f0f0f]'>
        <div className="min-h-full text-white bg-gray-900 flex rounded-lg flex-col items-center justify-center py-10">
          <div className='flex items-center justify-between w-full px-10 mb-4 rounded-lg m-2'>
            <h2 className="text-2xl font-bold">Create Post</h2>
            <Link to='/'>
              <IoMdCloseCircleOutline className='text-3xl' />
            </Link>
          </div>
          <div className="w-full items-center justify-around flex p-6 shadow-md">
            <div className="w-full p-4">
              <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-gray-400">Post Content:</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="What's on your mind?"
                  className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
                  required
                />

                <button
                  type="submit"
                  className={`w-full py-2 rounded ${uploading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                  disabled={uploading}
                >
                  {uploading ? 'Posting...' : 'Post'}
                </button>

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

export default UploadPost;