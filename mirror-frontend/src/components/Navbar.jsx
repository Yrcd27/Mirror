import React from "react";
import logo from "../assets/logo192.png"; // adjust path based on where you save the image
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-20 py-10 bg-black text-white">
      {/* Left section: Logo + Brand Name */}
      <div className="flex items-center space-x-2">
        {/* Logo image */}
        <img src={logo} alt="Mirror Logo" className="w-12 h-12" />
        <span className="text-3xl font-semibold">Mirror</span>
      </div>

      {/* Right section: Button */}
      <button
        className="border-2 border-white rounded-full px-6 py-3 text-lg text-white hover:text-[#7a7ffb] hover:border-[#7a7ffb] transition-colors duration-300"
      >
        <Link to="/login">Get Started</Link>
      </button>


    </nav>
  );
}