import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../../feature/themeSlice";
import { FaUserCircle, FaAngleRight, FaAngleDown } from "react-icons/fa";
import { IoMdSettings, IoMdHelpCircleOutline } from "react-icons/io";
import { WiMoonWaxingCrescent4 } from "react-icons/wi";
import { FaRegKeyboard } from "react-icons/fa6";
import { LuMessageSquareWarning } from "react-icons/lu";
import Logout from "../Logout";

function UserMenu({ userdata }) {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();
    const [showThemes, setShowThemes] = useState(false);

    return (
        <div className='text-white rounded-xl right-62 w-70 py-2 bg-[#262626]'>
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
                <h5 className='px-2 flex items-center'>
                    <span className='px-2'><IoMdSettings className="w-7 h-7" /></span>Settings
                </h5>
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
                        className={`p-1 rounded cursor-pointer hover:bg-[#5050507d] ${theme === "light" ? "font-bold dark:bg-gray-700" : ""
                            }`}
                        onClick={() => dispatch(setTheme("light"))}
                    >
                        Light Theme
                    </li>
                    <li
                        className={`p-1 rounded cursor-pointer hover:bg-[#5050507d] ${theme === "dark" ? "font-bold dark:bg-gray-700" : ""
                            }`}
                        onClick={() => dispatch(setTheme("dark"))}
                    >
                        Dark Theme
                    </li>
                </ul>
            )}
            <div className='py-2 my-2 hover:bg-[#5050507d] cursor-pointer'>
                <h5 className='px-2 flex items-center'>
                    <span className='px-2'><FaRegKeyboard className="w-7 h-7" /></span>Keyboard shortcuts
                </h5>
            </div>
            <div className='py-2 my-2 hover:bg-[#5050507d] cursor-pointer'>
                <h5 className='px-2 flex items-center'>
                    <span className='px-2'><IoMdHelpCircleOutline className="w-7 h-7" /></span>Help
                </h5>
            </div>
            <div className='py-2 my-2 hover:bg-[#5050507d] cursor-pointer'>
                <h5 className='px-2 flex items-center'>
                    <span className='px-2'><LuMessageSquareWarning className="w-7 h-7" /></span>Feedback
                </h5>
            </div>
        </div>
    );
}

export default UserMenu;
