import React, { useState } from 'react'

function MenuBox({ meunData }) {
  console.log("MenuBox")
  const [List, setLest] = useState([]);

  if(meunData){
    console.log(List);
    setLest(meunData)
  }
  return (
    <div>
      <div className='flex bg-[#262626] rounded-lg absolute top-12 right-25'>
        <ul className='space-y-2'>
          {List?.map((List) => (
            <li to={"/uploads/video"} className='hover:bg-[#3d3d3d] py-2 my-2 flex items-center'>
              {List.items}{console.log("print")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MenuBox