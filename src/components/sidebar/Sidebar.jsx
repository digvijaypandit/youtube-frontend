import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClock, FaThumbsUp, FaCog, FaShoppingBag, FaFilm,
  FaPodcast, FaGamepad, FaTrophy, FaBook, FaMusic, FaNewspaper, FaFire,
  FaUserCircle, FaStream
} from "react-icons/fa";
import {
  MdHome, MdSubscriptions, MdHistory, MdPlaylistPlay, MdOutlineSmartDisplay, MdLiveTv,
  MdFeedback, MdHelp, MdReport
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";

const Sidebar = ({ isCollapsed, toggleSidebar, ishidden }) => {
  const [activeId, setActiveId] = useState(null);

  const navigate = useNavigate();

  function clickedBtn(id, path) {
    setActiveId(id);
    navigate(path)
  }

  return (
    <>
      <div className={`h-[calc(100vh-56px)] fixed top-[56px] left-0 p-2  bg-white dark:bg-[#0f0f0f] text-black dark:text-white px-2 "max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 transition-all duration-300 ${isCollapsed ? "w-20" : "w-60"} flex flex-col`}>
        <nav className="space-y-2 flex-1">
          <div className={`${ishidden ? "hidden" : "block"}`}>
            <SidebarItem id={1} icon={<MdHome />} label="Home" path="/" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 1} />
            <SidebarItem id={2} icon={<SiYoutubeshorts />} label="Shorts" path="/shorts" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 2} />
            <SidebarItem id={3} icon={<MdSubscriptions />} label="Subscriptions" path="/subscriptions" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 3} />
            <SidebarItem id={4} icon={<FaUserCircle />} label="You" path="/feed/you" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 4} />
          </div>
          {!isCollapsed && (
            <>
              <SectionTitle title="You" />
              <SidebarItem id={5} icon={<MdHistory />} label="History" path="/history" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 5} />
              <SidebarItem id={6} icon={<MdPlaylistPlay />} label="Playlists" path="/user/playlists" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 6} />
              <SidebarItem id={7} icon={<MdOutlineSmartDisplay />} label="Your videos" path="/user/videos" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 7} />
              <SidebarItem id={8} icon={<FaClock />} label="Watch Later" path="/watch-later" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 8} />
              <SidebarItem id={9} icon={<FaThumbsUp />} label="Liked videos" path="/liked-videos" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 9} />

              <SectionTitle title="Explore" />
              <SidebarItem id={10} icon={<FaFire />} label="Trending" path="/trending" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 10} />
              <SidebarItem id={11} icon={<FaShoppingBag />} label="Shopping" path="/shopping" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 11} />
              <SidebarItem id={12} icon={<FaMusic />} label="Music" path="/music" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 12} />
              <SidebarItem id={13} icon={<FaFilm />} label="Films" path="/films" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 13} />
              <SidebarItem id={14} icon={<MdLiveTv />} label="Live" path="/live" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 14} />
              <SidebarItem id={15} icon={<FaGamepad />} label="Gaming" path="/gaming" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 15} />
              <SidebarItem id={16} icon={<FaNewspaper />} label="News" path="/news" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 16} />
              <SidebarItem id={17} icon={<FaTrophy />} label="Sport" path="/sport" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 17} />
              <SidebarItem id={18} icon={<FaBook />} label="Courses" path="/courses" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 18} />
              <SidebarItem id={19} icon={<FaStream />} label="Fashion & beauty" path="/fashion-&-beauty" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 19} />
              <SidebarItem id={20} icon={<FaPodcast />} label="Podcasts" path="/podcasts" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 20} />

              <SectionTitle title="Settings" />
              <SidebarItem id={21} icon={<FaCog />} label="Settings" path="/" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 21} />
              <SidebarItem id={22} icon={<MdReport />} label="Report history" path="/report-history" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 22} />
              <SidebarItem id={23} icon={<MdHelp />} label="Help" path="/help" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 23} />
              <SidebarItem id={24} icon={<MdFeedback />} label="Send feedback" path="/send-feedback" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 24} />

              <SectionTitle />
              <p className="text-[#313131] mx-2 px-4">&copy;2025 Digvijay Pandit • All rights reserved</p>
              <p className="text-[#313131] mx-2 px-4">This website is a clone created solely for educational purposes and is not affiliated with or endorsed by YouTube.</p>
            </>
          )}
        </nav>
      </div>
      <div className={`transition-transform duration-300${!isCollapsed ? " bg-[#0f0f0f51] h-screen absolute top-0 left-60 w-screen n z-40" : "hidden"}`} onClick={toggleSidebar}></div>
    </>
  );
};

// Sidebar Item Component
const SidebarItem = ({ id, path, icon, label, isCollapsed, active, onClick }) => {
  return (
    <div
      onClick={() => onClick(id, path)}
      className={`flex items-center px-6 py-4 rounded-lg cursor-pointer ${active && !isCollapsed ? "font-bold bg-[#262626]" : "hover:bg-[#262626]"} ${isCollapsed ? "justify-between flex-col items-center" : "space-x-3"}`}
    >
      <span className="text-2xl">{icon}</span>
      {isCollapsed && <span className="text-[10px]">{label}</span>}
      {!isCollapsed && <span className="text-base">{label}</span>}
    </div>
  );
};

// Section Title Component
const SectionTitle = ({ title }) => {
  return (
    <>
      <hr className="text-gray-600 ml-0 mr-2 mb-2" />
      <h2 className="text-gray-400 uppercase text-sm font-semibold mb-2 ml-2">{title}</h2>
    </>
  );
};

export default Sidebar;
