import React from 'react';

function MenuBox({ menuData }) {
  return (
    <div>
      <div className='flex bg-[#262626] rounded-lg p-4'>
        {menuData && menuData.length > 0 ? (
          <ul className="text-white space-y-2">
            {menuData.map((item, index) => (
              <li key={index} className="hover:bg-[#3d3d3d] cursor-pointer py-2 my-2 flex items-center">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white">No menu items available</p>
        )}
      </div>
    </div>
  );
}

export default MenuBox;
