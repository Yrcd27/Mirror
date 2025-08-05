import React from "react";
import logo from "../assets/flip.png"; // adjust path based on where you save the image
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-15 py-10">
      {/* Left section: Logo + Brand Name */}
      <div className="flex items-center space-x-2">
        {/* Logo image */}
        <img src={logo} alt="Mirror Logo" className="w-12 h-12" />
        <span className="text-3xl font-semibold">Mirror</span>
      </div>

      {/* Right section: Button */}
      <button className="border rounded-full px-6 py-3 text-lg hover:bg-gray-100 transition">
        <Link to="/login">Get Started</Link>
      </button>
    </nav>
  );
}
