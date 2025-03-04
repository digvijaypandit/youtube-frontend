import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlinePlaySquare } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";

function CreateMenu() {
  return (
    <div>
        <div className='flex bg-[#262626] rounded-lg absolute top-12 right-25'>
            <ul className='space-y-2'>
                <Link to={"/uploads/video"} className='hover:bg-[#3d3d3d] py-2 my-2 flex items-center'>
                    <AiOutlinePlaySquare className='mx-2'/> <h2 className='mr-2'>Upload Video</h2>
                </Link>
                <Link to={"/uploads/post"} className='hover:bg-[#3d3d3d] py-2 my-2 flex items-center'>
                    <IoIosCreate className='mx-2'/><h2 className='mr-2'>Create Post</h2>
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default CreateMenu;