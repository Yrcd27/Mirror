import React, { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import logo from "../assets/logo192.png";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`flex`}>
      {/* Sidebar */}
      <div
        className={`bg-black text-white flex flex-col justify-between h-screen transition-all duration-300
        ${isOpen ? "w-48" : "w-16"} md:w-48`}
      >
        {/* Top Section */}
        <div>
          {/* Logo */}
          <div className="flex items-center justify-center py-6 border-b border-gray-700">
            <img src={logo} alt="Mirror Logo" className="w-8 h-8 mr-2" />
            {isOpen && <span className="text-lg font-bold">Mirror</span>}
          </div>

          {/* Menu Items */}
          <nav className="mt-6 space-y-6 text-center">
            <a href="/journal" className="block hover:text-gray-400">
              Journal
            </a>
            <a href="/profile" className="block hover:text-gray-400">
              User Profile
            </a>
            <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200">
              + New Entry
            </button>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="py-6 text-center">
          <button className="flex items-center justify-center w-full hover:text-gray-400">
            <HiOutlineLogout size={20} />
            {isOpen && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </div>

      {/* Toggle Button (Mobile) */}
      <button
        className="md:hidden absolute top-4 left-4 bg-black text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "<" : ">"}
      </button>

      {/* Content Area */}
      <div className="flex-1 p-6">Your main content here</div>
    </div>
  );
}
