import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";
import { scrollToElement } from "../utils/scrollUtils";

export default function FloatingControls() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  // Handle scroll to track position with debouncing for better performance
  useEffect(() => {
    if (!isLandingPage) return;
    
    // Debounce scroll events for better performance
    let timeoutId = null;
    
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        // Calculate the threshold based on viewport height
        const scrollThreshold = Math.min(
          document.getElementById("hero")?.offsetHeight || 0, 
          window.innerHeight * 0.7
        );
        
        // If we're below the threshold, show the up button
        const shouldBeAtTop = window.scrollY < scrollThreshold;
        
        // Only update state if needed to prevent unnecessary renders
        if (shouldBeAtTop !== isAtTop) {
          setIsAtTop(shouldBeAtTop);
        }
        
        // Determine active section for highlighting in nav
        const sections = ["hero", "features", "how-it-works", "testimonials", "footer"];
        let currentSection = "hero";
        
        // Get the current scroll position + offset (20% of viewport)
        const scrollPosition = window.scrollY + window.innerHeight * 0.2;
        
        // Find the current section based on scroll position
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionId = sections[i];
          const section = document.getElementById(sectionId);
          
          if (section) {
            // If we're at or past the top of this section
            if (scrollPosition >= section.offsetTop) {
              currentSection = sectionId;
              break;
            }
          }
        }
        
        // Special case for footer (when we're at bottom of page)
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        if (isAtBottom) {
          currentSection = "footer";
        }
        
        if (currentSection !== activeSection) {
          setActiveSection(currentSection);
        }
        
      }, 100); // Small delay for performance
    };

    window.addEventListener("scroll", handleScroll);
    // Run once to set initial state
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLandingPage, isAtTop, activeSection]);

  // Dynamic scroll function based on current position
  const handleNavigationClick = () => {
    if (isAtTop) {
      // Scroll down to footer
      scrollToElement("footer");
    } else {
      // Scroll up to hero
      scrollToElement("hero");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden md:flex flex-col items-center gap-2 floating-controls" style={{ background: "none" }}>
      {/* Dynamic navigation control - only shown on landing page */}
      {isLandingPage && (
        <button
          onClick={handleNavigationClick}
          className={`p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
            theme === "light" 
              ? "bg-white text-[#7a7ffb] hover:bg-gray-100 border-[#7a7ffb] border" 
              : "bg-[#7a7ffb]/40 text-white hover:bg-[#7a7ffb]/60 border border-white/30"
          }`}
          aria-label={isAtTop ? "Scroll to bottom" : "Scroll to top"}
          title={isAtTop ? "Go to footer section" : "Go to hero section"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-transform duration-500 ${isAtTop ? "" : "transform rotate-180"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme === "light" ? "#7a7ffb" : "white"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      )}

      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
          theme === "light" 
            ? "bg-white text-[#7a7ffb] hover:bg-gray-100 border-[#7a7ffb] border" 
            : "bg-[#7a7ffb]/40 text-white hover:bg-[#7a7ffb]/60 border border-white/30"
        }`}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
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
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7a7ffb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>
    </div>
  );
}