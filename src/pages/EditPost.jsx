import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';

const EditPost = () => {
  const { tweetId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ content: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [deleting, setDeleting] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) {
      setMessage('Authentication required. Please log in.');
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!tweetId || !accessToken) {
        setMessage('Failed to load post.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/v1/tweets/${tweetId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        setFormData({ content: response.data.data.content });
      } catch (error) {
        setMessage('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [tweetId, accessToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');

    if (!formData.content.trim()) {
      setMessage('Post content cannot be empty.');
      setUpdating(false);
      return;
    }

    try {
      await axios.patch(
        `http://localhost:8000/api/v1/tweets/${tweetId}`,
        { content: formData.content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage('Post updated successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage('Failed to update post.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    setDeleting(true);
    setMessage('');

    try {
      await axios.delete(`http://localhost:8000/api/v1/tweets/${tweetId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMessage('Post deleted successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMessage('Failed to delete post.');
    } finally {
      setDeleting(false);
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
              </form>

              <button
                onClick={handleDelete}
                className={`w-full mt-4 py-2 rounded ${deleting ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'} text-white`}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete Post'}
              </button>

              {message && <p className="mt-4 text-center text-gray-400">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
