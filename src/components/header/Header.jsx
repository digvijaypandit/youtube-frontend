import React, { useState, useEffect, useRef } from "react";
import { FaPlus, FaBell } from "react-icons/fa";
import SearchBox from "../SearchBox";
import NavigationBar from "../NavigationBar";
import Sidebar from "../sidebar/Sidebar";
import UserMenu from "../userMenu/UserMenu";

function Header({ hiddensidebar }) {
  document.documentElement.classList.add("dark");

  const user = JSON.parse(localStorage.getItem("user"));

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [issidebarhidden, setIssidebarhidden] = useState(hiddensidebar);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const userMenuRef = useRef(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (hiddensidebar) {
      setIssidebarhidden(!issidebarhidden);
    }
  };

  const toggleViewUserMenu = () => {
    setIsShowMenu((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsShowMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex p-8 items-center justify-between bg-white dark:bg-black text-black dark:text-white px-4 py-2 fixed w-screen z-50">
      <NavigationBar toggleSidebar={toggleSidebar} />
      <SearchBox />
      

      <div className="flex items-center space-x-4 relative">
        {/* Create Button */}
        <div className="m-2 flex items-center justify-around bg-[#f2f2f2] dark:bg-[#262626] p-2 px-4 cursor-pointer rounded-full hover-theme">
          <FaPlus className="text-black dark:text-white" />
          <h5 className="text-black dark:text-white ml-2">Create</h5>
        </div>

        {/* Notification Button */}
        <button className="ml-2 bg-[#f2f2f2] dark:bg-[#262626] p-3 cursor-pointer rounded-full hover-theme">
          <FaBell className="text-black dark:text-white" />
        </button>

        {/* User Avatar */}
        <div className="cursor-pointer flex items-center" onClick={toggleViewUserMenu}>
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
