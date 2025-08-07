import React, { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import logo from "../assets/logo192.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      className={`bg-black text-white flex flex-col justify-between h-screen fixed top-0 left-0 py-6 transition-all duration-300 z-10 ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center py-10">
          <img src={logo} alt="Mirror Logo" className="w-10 h-10 mr-2" />
          {isOpen && <span className="text-3xl font-bold">Mirror</span>}
        </div>

        {/* Menu Items */}
        <nav className="mt-6 flex flex-col items-center py-10 gap-10">
          <Link to="/dashboard" className="hover:text-gray-400 text-m font-bold">
            Journal
          </Link>
          <Link to="/profile" className="hover:text-gray-400 text-m font-bold">
            Profile
          </Link>
          <Link
            to="/new-entry"
            className="bg-white text-black w-40 py-2 rounded-full hover:bg-gray-200 text-center text-m font-bold"
          >
            + New Entry
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="py-6 text-center">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full hover:text-gray-400"
        >
          <HiOutlineLogout size={20} />
          {isOpen && <span className="ml-2">Logout</span>}
        </button>
      </div>

      {/* Toggle Button (mobile view only) */}
      <button
        className="md:hidden absolute top-4 right-[-2rem] bg-black text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "<" : ">"}
      </button>
    </div>
  );
}
