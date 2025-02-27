import React from 'react'
import { FaSearch, FaMicrophone } from "react-icons/fa";

function SearchBox() {
    return (
        <div className="flex items-center w-1/2">
            <input
                type="text"
                placeholder="Search"
                className="w-full bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded-l-full border border-[#303030] focus:outline-none focus:border-white"
            />
            <button className="bg-[#303030] px-4 py-2 h-[41px] rounded-r-full border cursor-pointer border-[#303030]">
                <FaSearch className="text-white" />
            </button>
            <button className="ml-2 bg-[#303030] p-3 cursor-pointer rounded-full">
                <FaMicrophone className="text-white" />
            </button>
        </div>
    )
}

export default SearchBox