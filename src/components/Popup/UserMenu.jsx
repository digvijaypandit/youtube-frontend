import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"; // Import Axios
import { setTheme } from "../../feature/themeSlice";
import { FaUserCircle, FaAngleRight, FaAngleDown } from "react-icons/fa";
import { IoMdSettings, IoMdHelpCircleOutline } from "react-icons/io";
import { WiMoonWaxingCrescent4 } from "react-icons/wi";
import { FaRegKeyboard } from "react-icons/fa6";
import { LuMessageSquareWarning } from "react-icons/lu";
import { RiRefreshLine } from "react-icons/ri";
import Logout from "../Logout";

function UserMenu({ userdata }) {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showThemes, setShowThemes] = useState(false);

    const handleRefreshToken = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/users/refresh-token",
                {},  // Empty body
                {
                    withCredentials: true,  // Ensure cookies are sent
                }
            );
    
            if (response.status === 200) {
                console.log("Token refreshed successfully:", response.data);
                window.location.reload();
            }
        } catch (error) {
            console.error("Error refreshing token:", error.response?.data || error.message);
        }
    };
    
    
    return (
        <div className='text-white rounded-xl z-50 right-62 w-70 py-2 bg-[#262626]'>
            <div className='flex p-2'>
                <img src={userdata.avatar} className='w-14 h-14 rounded-full' alt="User Avatar" />
                <div className='px-2'>
                    <p className="text-lg font-medium">{userdata.fullName}</p>
                    <p className="text-gray-400 text-sm">@{userdata.username}</p>
                    <Link to={`/channel/${userdata.username}`} className='text-[#147ad3] cursor-pointer'>View your channel</Link>
                </div>
            </div>
            <hr className='bg-[#505050b0] text-transparent' />
            <div className='py-2 my-2 hover:bg-[#5050507d] cursor-pointer'>
                <h5 className='px-2 flex items-center'>
                    <span className='px-2'><FaUserCircle className="w-7 h-7" /></span>Account
                </h5>
            </div>
            <div className='py-2 my-2 hover:bg-[#5050507d] cursor-pointer'>
                <Logout />
            </div>
            <div className='py-2 my-2 hover:bg-[#5050507d] cursor-pointer'>
                <Link to="/user/setting" className='px-2 flex items-center'>
                    <span className='px-2'><IoMdSettings className="w-7 h-7" /></span>Settings
                </Link>
            </div>
            <hr className='text-transparent bg-[#505050b0]' />
            <div
                className='py-2 my-2 hover:bg-[#5050507d] cursor-pointer'
                onClick={() => setShowThemes(!showThemes)}
            >
                <h5 className='px-2 flex items-center justify-between'>
                    <span className='flex items-center'>
                        <WiMoonWaxingCrescent4 className="w-7 h-7 text-white stroke-current" strokeWidth="2" fill="none" />
                        <span className='ml-2'>Appearance: Dark</span>
                    </span>
                    {showThemes ? <FaAngleDown /> : <FaAngleRight />}
                </h5>
            </div>
            {showThemes && (
                <ul className="flex justify-around m-1 p-2 rounded">
                    <li
                        className={`p-1 rounded cursor-pointer hover:bg-[#5050507d] ${theme === "light" ? "font-bold dark:bg-gray-700" : ""}`}
                        onClick={() => dispatch(setTheme("light"))}
                    >
                        Light Theme
                    </li>
                    <li
                        className={`p-1 rounded cursor-pointer hover:bg-[#5050507d] ${theme === "dark" ? "font-bold dark:bg-gray-700" : ""}`}
                        onClick={() => dispatch(setTheme("dark"))}
                    >
                        Dark Theme
                    </li>
                </ul>
            )}
            <div className='py-2 my-2 hover:bg-[#5050507d] cursor-pointer' onClick={handleRefreshToken}>
                <h5 className='px-2 flex items-center'>
                    <span className='px-2'><RiRefreshLine className="w-7 h-7" /></span>Refresh Token
                </h5>
            </div>
            <div className='py-2 my-2 hover:bg-[#5050507d] cursor-not-allowed'>
                <h5 className='px-2 flex items-center'>
                    <span className='px-2'><FaRegKeyboard className="w-7 h-7" /></span>Keyboard shortcuts
                </h5>
            </div>
            <hr className='text-transparent bg-[#505050b0]' />
            <div className='py-2 my-2 hover:bg-[#5050507d] cursor-not-allowed'>
                <h5 className='px-2 flex items-center'>
                    <span className='px-2'><IoMdHelpCircleOutline className="w-7 h-7" /></span>Help
                </h5>
            </div>
            <div className='py-2 my-2 hover:bg-[#5050507d] cursor-not-allowed'>
                <h5 className='px-2 flex items-center'>
                    <span className='px-2'><LuMessageSquareWarning className="w-7 h-7" /></span>Feedback
                </h5>
            </div>
        </div>
    );
}

export default UserMenu;
