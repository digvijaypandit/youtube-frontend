import React, { useState } from "react";
import {
  FaHome, FaHistory, FaClock, FaThumbsUp, FaCog, FaShoppingBag, FaFilm,
  FaPodcast, FaGamepad, FaTrophy, FaBook, FaMusic, FaNewspaper, FaFire,
  FaVideo, FaUserCircle, FaStream
} from "react-icons/fa";
import {
  MdHome, MdSubscriptions, MdHistory, MdPlaylistPlay, MdOutlineSmartDisplay, MdLiveTv,
  MdFeedback, MdHelp, MdReport
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import NavigationBar from "../NavigationBar";

const Sidebar = ({ isCollapsed }) => {
  const [activeId, setActiveId] = useState(null);

  function clickedBtn(id) {
    setActiveId(id);
  }

  return (
    <>
      <div className={`h-screen transition-transform duration-200 fixed top-14 left-0 p-2 bg-[#181818] px-2 text-white overflow-y-auto transition-all duration-300 ${isCollapsed ? "w-20" : "w-60"} flex flex-col`}>
        <nav className="space-y-2 flex-1">
          <SidebarItem id={1} icon={<MdHome />} label="Home" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 1} />
          <SidebarItem id={2} icon={<SiYoutubeshorts />} label="Shorts" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 2} />
          <SidebarItem id={3} icon={<MdSubscriptions />} label="Subscriptions" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 3} />
          <SidebarItem id={4} icon={<FaUserCircle />} label="You" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 4} />

          {!isCollapsed && (
            <>
              <SectionTitle title="You" />
              <SidebarItem id={5} icon={<MdHistory />} label="History" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 5} />
              <SidebarItem id={6} icon={<MdPlaylistPlay />} label="Playlists" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 6} />
              <SidebarItem id={7} icon={<MdOutlineSmartDisplay />} label="Your videos" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 7} />
              <SidebarItem id={8} icon={<FaClock />} label="Watch Later" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 8} />
              <SidebarItem id={9} icon={<FaThumbsUp />} label="Liked videos" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 9} />

              <SectionTitle title="Explore" />
              <SidebarItem id={10} icon={<FaFire />} label="Trending" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 10} />
              <SidebarItem id={11} icon={<FaShoppingBag />} label="Shopping" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 11} />
              <SidebarItem id={12} icon={<FaMusic />} label="Music" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 12} />
              <SidebarItem id={13} icon={<FaFilm />} label="Films" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 13} />
              <SidebarItem id={14} icon={<MdLiveTv />} label="Live" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 14} />
              <SidebarItem id={15} icon={<FaGamepad />} label="Gaming" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 15} />
              <SidebarItem id={16} icon={<FaNewspaper />} label="News" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 16} />
              <SidebarItem id={17} icon={<FaTrophy />} label="Sport" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 17} />
              <SidebarItem id={18} icon={<FaBook />} label="Courses" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 18} />
              <SidebarItem id={19} icon={<FaStream />} label="Fashion & beauty" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 19} />
              <SidebarItem id={20} icon={<FaPodcast />} label="Podcasts" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 20} />

              <SectionTitle title="Settings" />
              <SidebarItem id={21} icon={<FaCog />} label="Settings" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 21} />
              <SidebarItem id={22} icon={<MdReport />} label="Report history" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 22} />
              <SidebarItem id={23} icon={<MdHelp />} label="Help" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 23} />
              <SidebarItem id={24} icon={<MdFeedback />} label="Send feedback" isCollapsed={isCollapsed} onClick={clickedBtn} active={activeId === 24} />
            </>
          )}
        </nav>
      </div>
      <div className={`transition-transform duration-300${!isCollapsed ? " bg-black/80 h-screen absolute top-0 left-60 w-screen " : "hidden"}`}>white</div>
    </>
  );
};

// Sidebar Item Component
const SidebarItem = ({ id, icon, label, isCollapsed, active, onClick }) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`flex items-center px-6 py-4 rounded-lg cursor-pointer ${active && !isCollapsed ? "font-bold bg-gray-700" : "hover:bg-gray-800"} ${isCollapsed ? "justify-between flex-col items-center" : "space-x-3"}`}
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
