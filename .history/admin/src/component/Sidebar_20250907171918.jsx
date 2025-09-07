import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  let navigate = useNavigate();
  let location = useLocation();

  const menuItems = [
    { path: "/add", label: "Add Items", icon: <IoIosAddCircleOutline className="w-5 h-5" /> },
    { path: "/lists", label: "List Items", icon: <FaRegListAlt className="w-5 h-5" /> },
    { path: "/orders", label: "View Orders", icon: <SiTicktick className="w-5 h-5" /> },
  ];

  return (
    <div className="w-[18%] min-h-screen border-r bg-white fixed left-0 top-0 pt-[100px]">
      <div className="flex flex-col gap-4 pl-[15%] text-[15px]">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 px-3 py-2 cursor-pointer rounded-r-lg transition-all 
              ${location.pathname === item.path 
                ? "bg-[#2c7b89] text-white font-semibold" 
                : "border border-gray-200 hover:bg-[#2c7b89] hover:text-white"}`}
          >
            {item.icon}
            <p className="hidden md:block">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
