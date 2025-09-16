import React, { useState } from "react";
import logo from "../assets/logo192.png"; // adjust path as needed
import flipLogo from "../assets/flip.png";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <nav className={`relative flex items-center justify-between px-6 sm:px-12 md:px-20 py-6 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-300`}>
      {/* Left section: Logo + Brand Name */}
      <div className="flex items-center space-x-2">
        {/* Logo image - changes based on theme */}
        <img 
          src={theme === 'dark' ? logo : flipLogo} 
          alt="Mirror Logo" 
          className="w-8 h-8 sm:w-10 sm:h-10" 
        />
        {/* Hide brand name on small screens */}
        <span className="hidden sm:inline text-2xl sm:text-3xl font-semibold">Mirror</span>
      </div>

      {/* Desktop view - Right section: Button */}
      <div className="hidden md:block">
        <Link to="/login">
          <button
            className={`border-2 rounded-full px-6 py-2.5 text-lg ${
              theme === 'dark'
                ? 'border-white text-white hover:text-[#7a7ffb] hover:border-[#7a7ffb]'
                : 'border-black text-black hover:text-[#7a7ffb] hover:border-[#7a7ffb]'
            } transition-colors duration-300`}
          >
            Get Started
          </button>
        </Link>
      </div>

      {/* Mobile view - Menu button */}
      <button 
        className={`block md:hidden p-2 rounded-full transition-all duration-300 ${
          theme === 'dark' && mobileMenuOpen ? 'bg-gray-800/50' : 
          theme === 'light' && mobileMenuOpen ? 'bg-gray-200/50' : ''
        }`}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {mobileMenuOpen ? (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          ) : (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu - Full Screen */}
      <div 
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          mobileMenuOpen 
            ? 'opacity-100' 
            : 'opacity-0 pointer-events-none'
        } ${
          theme === 'dark' ? 'bg-black/95 text-white' : 'bg-white/95 text-black'
        } backdrop-blur-sm`}
        style={{
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-1%)',
          transition: 'opacity 0.3s ease, transform 0.3s ease'
        }}
      >
          {/* Close Button - Positioned at top right */}
          <button 
            className={`absolute top-6 right-6 p-2 rounded-full ${
              theme === 'dark' 
                ? 'bg-gray-800/50 hover:bg-gray-700/70' 
                : 'bg-gray-200/50 hover:bg-gray-300/70'
            } transition-all duration-300`}
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>

          <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto px-8">
            <div 
              className="flex flex-row items-center space-x-4 mb-12 transition-all duration-500"
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease'
              }}
            >
              <img 
                src={theme === 'dark' ? logo : flipLogo} 
                alt="Mirror Logo" 
                className="w-16 h-16" 
              />
              <h1 className="text-4xl font-bold">Mirror</h1>
            </div>
            
            {/* Theme Toggle */}
            <div 
              className="flex items-center justify-between w-full mb-8 py-5 border-b border-t border-opacity-20"
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s'
              }}
            >
              <span className="text-xl font-medium">
                {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </span>
              <button
                onClick={toggleTheme}
                className={`ml-3 p-3 rounded-full ${
                  theme === 'light'
                    ? 'bg-white text-[#7a7ffb] border-2 border-[#7a7ffb] shadow-md' 
                    : 'bg-[#7a7ffb]/40 text-white border-2 border-white/30 shadow-md'
                } transition-all duration-300`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7a7ffb"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>
            
            {/* Mobile Get Started button */}
            <Link to="/login" className="w-full mb-8" style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s'
            }}>
              <button
                className={`w-full border-2 rounded-full py-4 text-center text-xl font-semibold ${
                  theme === 'dark'
                    ? 'border-white text-white bg-transparent hover:bg-[#7a7ffb]/10 hover:border-[#7a7ffb]'
                    : 'border-black text-black bg-transparent hover:bg-[#7a7ffb]/10 hover:border-[#7a7ffb]'
                } transition-all duration-300 shadow-md`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </button>
            </Link>
            
            {/* Navigation Links */}
            <div className="mt-8 flex flex-col items-center space-y-6 text-xl" style={{
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s'
            }}>
              <a 
                href="#features" 
                className="hover:text-[#7a7ffb] transition-colors duration-200 text-2xl" 
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const featuresSection = document.getElementById("features");
                  if (featuresSection) {
                    setTimeout(() => {
                      featuresSection.scrollIntoView({ behavior: "smooth" });
                    }, 300); // Small delay to allow menu to close
                  }
                }}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className="hover:text-[#7a7ffb] transition-colors duration-200 text-2xl" 
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const howItWorksSection = document.getElementById("how-it-works");
                  if (howItWorksSection) {
                    setTimeout(() => {
                      howItWorksSection.scrollIntoView({ behavior: "smooth" });
                    }, 300); // Small delay to allow menu to close
                  }
                }}
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                className="hover:text-[#7a7ffb] transition-colors duration-200 text-2xl" 
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  const testimonialsSection = document.getElementById("testimonials");
                  if (testimonialsSection) {
                    setTimeout(() => {
                      testimonialsSection.scrollIntoView({ behavior: "smooth" });
                    }, 300); // Small delay to allow menu to close
                  }
                }}
              >
                Testimonials
              </a>
            </div>
          </div>
      </div>
    </nav>
  );
}
