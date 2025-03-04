import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaBell } from "react-icons/fa";
import SearchBox from "../SearchBox";
import NavigationBar from "../NavigationBar";
import Sidebar from "../sidebar/Sidebar";
import UserMenu from "../Popup/UserMenu";
import CreateMenu from "../Popup/CreateMenu";

function Header({ hiddensidebar }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [issidebarhidden, setIssidebarhidden] = useState(hiddensidebar);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowCreateMenu, setIsShowCreateMenu] = useState(false);

  const userMenuRef = useRef(null);
  const createMenuRef = useRef(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (hiddensidebar) {
      setIssidebarhidden(!issidebarhidden);
    }
  };

  const toggleViewCreateMenu = () => {
    setIsShowCreateMenu((prev) => !prev);
  }

  const toggleViewUserMenu = () => {
    setIsShowMenu((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsShowMenu(false);
      }
      if (createMenuRef.current && !createMenuRef.current.contains(event.target)) {
        setIsShowCreateMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex p-8 items-center justify-between bg-white dark:bg-[#0f0f0f] text-black dark:text-white px-4 py-2 fixed w-screen z-50">
      <NavigationBar toggleSidebar={toggleSidebar} />
      <SearchBox />

      <div className="flex items-center space-x-4 relative">
        {/* Create Button */}
        <div className="m-2 flex items-center justify-around bg-[#f2f2f2] dark:bg-[#262626] p-2 px-4 cursor-pointer rounded-full hover-theme" onClick={toggleViewCreateMenu}>
          <FaPlus className="text-black dark:text-white" />
          <h5 className="text-black dark:text-white ml-2">Create</h5>
        </div>
        {isShowCreateMenu && (
          <div ref={createMenuRef} >
            <CreateMenu />
          </div>
        )}

        {/* Notification Button */}
        <button className="ml-2 bg-[#f2f2f2] dark:bg-[#262626] p-3 cursor-pointer rounded-full hover-theme">
          <FaBell className="text-black dark:text-white" />
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 cursor-pointer flex items-center" onClick={toggleViewUserMenu}>
          <img src={user.avatar} className="w-10 h-10 rounded-full" />
        </div>

        {/* User Menu Dropdown */}
        {isShowMenu && (
          <div ref={userMenuRef} className="absolute right-0 top-12">
            <UserMenu userdata={user} />
          </div>
        )}
      </div>

      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} ishidden={issidebarhidden} />
    </div>
  );
}

export default Header;
