import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiUser, FiMail, FiUpload, FiSave, FiCamera } from 'react-icons/fi';

const ProfileSettings = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Store original data to detect changes
  const [originalData, setOriginalData] = useState({
    coverImage: null,
    avatar: null,
    username: '',
    email: '',
  });

  const accessToken = localStorage.getItem('accessToken');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1/users',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/current-user');
        const { username, email, avatar, coverImage } = response.data.data;

        // Set both current state and original data
        setUsername(username || '');
        setEmail(email || '');
        setAvatar(avatar || '');
        setCoverImage(coverImage || '');
        setOriginalData({
          username: username || '',
          email: email || '',
          avatar: avatar || '',
          coverImage: coverImage || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleAccountUpdate = async () => {
    setSaving(true);

    try {
      // Track what has changed
      const updatedFields = {};

      if (username !== originalData.username) {
        updatedFields.username = username;
      }

      if (email !== originalData.email) {
        updatedFields.email = email;
      }

      if (coverImage instanceof File) {
        const coverForm = new FormData();
        coverForm.append('coverImage', coverImage);
        await axiosInstance.post('/coverImage', coverForm);
      }

      if (avatar instanceof File) {
        const avatarForm = new FormData();
        avatarForm.append('avatar', avatar);
        await axiosInstance.post('/avatar', avatarForm);
      }

      if (Object.keys(updatedFields).length > 0) {
        await axiosInstance.put('/update-account', updatedFields);
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="bg-[#1f1f1f] shadow-lg rounded-lg p-6 mb-6 text-white">
      <h3 className="text-xl font-bold mb-4">Profile Settings</h3>

      <div
        className="h-52 w-full bg-gray-800 rounded-lg mb-6 relative overflow-hidden"
        style={{
          backgroundImage: coverImage
            ? `url(${coverImage instanceof File ? URL.createObjectURL(coverImage) : coverImage})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <label className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full cursor-pointer">
          <FiCamera />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>

      <div className="relative mb-6 -mt-20 flex justify-center">
        <img
          src={
            avatar
              ? avatar instanceof File
                ? URL.createObjectURL(avatar)
                : avatar
              : ''
          }
          alt="Avatar"
          className="w-32 h-32 rounded-full border-4 border-[#0f0f0f]"
        />
        <label className="absolute bottom-1 left-[53%] bg-blue-600 p-2 rounded-full text-white cursor-pointer">
          <FiCamera />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="hidden"
          />
        </label>
      </div>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-4 p-2 bg-[#2c2c2c] rounded text-white"
        placeholder="Username"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 bg-[#2c2c2c] rounded text-white"
        placeholder="Email"
      />

      <button
        onClick={handleAccountUpdate}
        className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
        disabled={saving}
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
};

export default ProfileSettings;
