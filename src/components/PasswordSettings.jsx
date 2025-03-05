import React, { useState } from 'react';
import axios from 'axios';

const PasswordSettings = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem('accessToken');

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        'http://localhost:8000/api/v1/users/current-user',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      alert('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      alert('Failed to change password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1f1f1f] shadow-lg rounded-lg p-6 text-white">
      <h3 className="text-xl font-bold mb-4">Change Password</h3>

      <input type="password" placeholder="Current Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full mb-4 p-2 bg-[#2c2c2c] rounded" />
      <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full mb-4 p-2 bg-[#2c2c2c] rounded" />
      <input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full mb-4 p-2 bg-[#2c2c2c] rounded" />

      <button onClick={handlePasswordChange} className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700" disabled={loading}>
        {loading ? 'Changing...' : 'Change Password'}
      </button>
    </div>
  );
};

export default PasswordSettings;
