import React from 'react'
import { Link } from 'react-router-dom';
import { FaBars} from "react-icons/fa";
import Logo from "./Logo";

function NavigationBar({toggleSidebar}) {
  return (
    <div>
        <div className="flex mx-2 items-center space-x-4">
        <FaBars className=" bg-white dark:bg-[#0f0f0f] text-black dark:text-white text-2xl cursor-pointer" onClick={toggleSidebar} />
        <Link to={"/"} className="h-5 w-auto mx-3 flex justify-center cursor-pointer items-center">
          <Logo />
        </Link>
      </div>
    </div>
  )
}

export default NavigationBar