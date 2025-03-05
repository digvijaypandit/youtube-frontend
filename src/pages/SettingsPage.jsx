import React from 'react';
import ProfileSettings from '../components/ProfileSettings';
import PasswordSettings from '../components/PasswordSettings';
import Header from '../components/header/Header'

const SettingsPage = () => {
  return (
  <div>
    <Header />
    <div className='p-14 max-w-screen bg-[#0f0f0f]'>
      <div className="max-w-6xl mx-auto p-6 text-white min-h-screen">
        <ProfileSettings />
        <PasswordSettings />
      </div>
    </div>
    </div>
    );
};

    export default SettingsPage;
