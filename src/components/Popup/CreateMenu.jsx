import React, { useState } from 'react';
import { FiVideo, FiRadio, FiEdit } from 'react-icons/fi';

const CreateMenu = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      <button 
        className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-900 text-white rounded-md shadow-lg z-10">
          <ul className="py-2">
            <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
              <FiVideo className="mr-2" />
              Upload video
            </li>
            <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
              <FiRadio className="mr-2" />
              Go live
            </li>
            <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
              <FiEdit className="mr-2" />
              Create post
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateMenu;
