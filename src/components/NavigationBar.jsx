import React from 'react'
import { FaBars} from "react-icons/fa";
import Logo from "./Logo";
function NavigationBar({toggleSidebar}) {
  return (
    <div>
        <div className="flex mx-2 items-center space-x-4">
        <FaBars className="text-white text-2xl cursor-pointer" onClick={toggleSidebar} />
        <div className="h-5 w-auto mx-3 flex justify-center cursor-pointer items-center">
          <Logo />
        </div>
      </div>
    </div>
  )
}

export default NavigationBar