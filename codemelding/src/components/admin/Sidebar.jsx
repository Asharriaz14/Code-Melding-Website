import { useState, useEffect, useCallback, useMemo } from "react";
import { NavLink } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import AppIcon from '../../assets/Logo.png';
import { IoMusicalNotesOutline } from "react-icons/io5";
import { TbBuildingStore } from "react-icons/tb";
import { BsCollectionPlay } from "react-icons/bs";
import { MdOutlineViewTimeline } from "react-icons/md";
import { PiHouseLight } from "react-icons/pi";
import { IoCreateOutline } from "react-icons/io5";

import './sidebar.css'; 

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleResize = useCallback(() => {
    setOpen(window.innerWidth >= 768);
  }, []);

  useEffect(() => {
    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const Menus = useMemo(() => [
    { title: "Home", icon: <PiHouseLight size={20} />, link: "/admin-dashboard" },
    { title: "Create Post", icon: <IoCreateOutline size={20} />, link: "/createpost" },
    { title: "Marketplace", icon: <TbBuildingStore size={20} />, link: "/All Blogs" },
    { title: "Streaming", icon: <BsCollectionPlay size={20} />, link: "/watchstream" },
    { title: "Timeline", icon: <MdOutlineViewTimeline size={20} />, link: "/timeline" },
   
  ], []);

  const sidebarWidth = open ? "w-72 pt-4" : "w-20";
  const rotateClass = !open ? "rotate-180" : "";
  const scaleClass = !open ? "scale-0" : "";

  return (
    <div className={`${sidebarWidth} bg-Orange px-5 sticky top-0 h-screen duration-300 overflow-hidden`}>
      <div className="flex justify-center">
        <div
          className={`absolute cursor-pointer -right-3 top-12 w-8 rounded-full flex items-center justify-center bg-[#060b16] p-2 text-white ${rotateClass}`}
          onClick={() => setOpen(prev => !prev)}
        >
          <FaChevronLeft />
        </div>
      </div>
      <div className="flex gap-x-4 items-center">
        <img src={AppIcon} alt="App Icon" className="h-10" />
        <h1 className={`text-white origin-left font-semibold text-lg duration-200 ${scaleClass}`}>
          Codemelding Solution
        </h1>
      </div>
      <ul className="pt-6 custom-scrollbar">
        {Menus.map((menu, index) => (
          <li
            key={index}
          >
            <NavLink 
              to={menu.link} 
              className={({ isActive }) => 
                `flex rounded-md px-2 py-2.5 cursor-pointer text-White text-xs md:text-lg font-normal items-center gap-x-4 ${isActive ? "bg-red" : "hover:text-red"}`
              }
            >
              {menu.icon}
              <span className={`${!open ? "hidden" : ""} origin-left duration-200`}>
                {menu.title}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
