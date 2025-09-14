import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo192.png";
import flipLogo from "../assets/flip.png";
import { useTheme } from "../context/ThemeContext";

export default function FooterSection() {
  const { theme } = useTheme();
  
  return (
    <footer className={`py-16 px-6 md:px-12 theme-transition ${
      theme === 'dark' 
        ? 'bg-black text-white border-t border-white/10' 
        : 'bg-white text-black border-t border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          {/* Brand Section */}
          <div className="md:col-span-1 space-y-6 flex flex-col items-center md:items-start">
            {/* Logo & Brand */}
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-6">
              <img src={theme === 'dark' ? logo : flipLogo} alt="Mirror Logo" className="w-8 h-8" />
              <span className="text-xl font-semibold">Mirror</span>
            </div>

            {/* Tagline */}
            <p className={theme === 'dark' ? "text-gray-400" : "text-gray-600"}>Reflect, Grow, Become</p>

            {/* Copyright */}
            <p className="text-xs text-gray-500">© 2025 Mirror. All rights reserved.</p>
          </div>

          {/* Navigation Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-6">Explore</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className={`hover:text-[#7a7ffb] transition ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a href="#whyJournal" className={`hover:text-[#7a7ffb] transition ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Why Journal
                </a>
              </li>
              <li>
                <a href="#features" className={`hover:text-[#7a7ffb] transition ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Features
                </a>
              </li>
              <li>
                <a href="#howItWorks" className={`hover:text-[#7a7ffb] transition ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <a href="#testimonials" className={`hover:text-[#7a7ffb] transition ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#prompts" className={`hover:text-[#7a7ffb] transition ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Journal Prompts
                </a>
              </li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-6">Account</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/login" className={`hover:text-[#7a7ffb] transition ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/signup" className={`hover:text-[#7a7ffb] transition ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Text */}
        <div className={`mt-16 pt-6 text-center text-sm text-gray-500 ${
          theme === 'dark' ? 'border-t border-white/10' : 'border-t border-gray-200'
        }`}>
          <p>Mirror is designed to help you reflect on your journey through private journaling.</p>
        </div>
      </div>
    </footer>
  );
}
