import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';

const EditPost = () => {
  const { postId } = useParams();  // Get post ID from URL
  const navigate = useNavigate();  // For redirecting after successful update

  const [formData, setFormData] = useState({
    content: '',
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    setMessage('Authentication required. Please log in.');
  }

  useEffect(() => {
    // Fetch post data for editing
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/Posts/${postId}/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setFormData({ content: response.data.content });
      } catch (error) {
        console.error('Fetch error:', error);
        setMessage('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) fetchPost();
  }, [postId, accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');

    try {
      await axios.patch(`http://localhost:8000/api/v1/Posts/${postId}/`, { content: formData.content }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setMessage('Post updated successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Update error:', error);
      setMessage(error.response?.data?.detail || 'Failed to update post.');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p className='text-white text-center'>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className='p-14 bg-[#0f0f0f]'>
        <div className="min-h-full text-white bg-gray-900 flex rounded-lg flex-col items-center justify-center py-10">
          <div className='flex items-center justify-between w-full px-10 mb-4 rounded-lg m-2'>
            <h2 className="text-2xl font-bold">Edit Post</h2>
            <Link to='/'>
              <IoMdCloseCircleOutline className='text-3xl' />
            </Link>
          </div>
          <div className="w-full items-center justify-around flex p-6 shadow-md">
            <div className="w-full p-4">
              <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-gray-400">Edit Content:</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Edit your post..."
                  className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
                  required
                />

                <button
                  type="submit"
                  className={`w-full py-2 rounded ${updating ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                  disabled={updating}
                >
                  {updating ? 'Updating...' : 'Update'}
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

export default EditPost;
