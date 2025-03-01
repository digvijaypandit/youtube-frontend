import React from "react";
import { useLocation } from "react-router-dom";
import {
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";

const ShareComponent = () => {
  const location = useLocation();
  const shareUrl = `${window.location.origin}${location.pathname}`;

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=Check this out&body=${encodeURIComponent(shareUrl)}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="fixed top-[40%] left-[40%] z-40 bg-gray-950 p-4 rounded-lg shadow-lg text-white w-[350px]">
      <h3 className="text-lg font-semibold mb-3">Share</h3>
      <div className="flex justify-between items-center space-x-4">
        {/* WhatsApp */}
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 p-3 rounded-full hover:opacity-80"
        >
          <FaWhatsapp size={20} />
        </a>

        {/* Facebook */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 p-3 rounded-full hover:opacity-80"
        >
          <FaFacebookF size={20} />
        </a>

        {/* Twitter (X) */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black p-3 rounded-full hover:opacity-80"
        >
          <FaTwitter size={20} />
        </a>

        {/* Email */}
        <a
          href={shareLinks.email}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-600 p-3 rounded-full hover:opacity-80"
        >
          <FaEnvelope size={20} />
        </a>
      </div>

      {/* Copy Link Section */}
      <div className="mt-4 flex items-center bg-gray-700 p-2 rounded-lg">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="bg-transparent text-white text-sm w-full outline-none"
        />
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 text-white px-3 py-1 rounded-md ml-2 hover:bg-blue-600"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ShareComponent;
