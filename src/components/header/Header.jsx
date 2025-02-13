import React,{useState} from "react";
import { FaBell, FaUserCircle, FaTh } from "react-icons/fa";
import SearchBox from "../SearchBox";
import NavigationBar from "../NavigationBar";
import Sidebar from '../sidebar/Sidebar'

function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex p-8 items-center justify-between bg-[#181818] px-4 py-2 fixed w-screen">
      <NavigationBar  toggleSidebar={toggleSidebar}/>
      <SearchBox />

      <div className="flex items-center space-x-4">
        <FaTh className="text-white text-xl cursor-pointer" />
        <FaBell className="text-white text-xl cursor-pointer" />
        <FaUserCircle className="text-white text-2xl cursor-pointer" />
      </div>
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default Header;
