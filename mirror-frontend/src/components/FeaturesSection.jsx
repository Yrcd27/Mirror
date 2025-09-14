import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function FeaturesSection() {
  const { theme } = useTheme();
  
  return (
    <section className={`py-24 px-6 md:px-12 theme-transition ${
      theme === 'dark' ? 'bg-[#0c0b18] text-white' : 'bg-white text-black'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Section heading with animation */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-5xl font-bold mb-6 animate-fade-up"
            style={{
              animationDelay: "100ms",
              fontFamily: "'Sansation', sans-serif",
            }}
          >
            Your Personal Mirror
          </h2>
          <p 
            className={`text-lg md:text-xl max-w-3xl mx-auto animate-fade-up ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
            style={{ animationDelay: "200ms" }}
          >
            Mirror offers a suite of features designed to enhance your journaling experience:
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div 
            className={`p-8 rounded-xl shadow-lg hover:translate-y-[-8px] transition-all duration-500 animate-fade-up ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-black to-[#131225] hover:shadow-[#7a7ffb]/20'
                : 'bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg border border-gray-200'
            }`}
            style={{ animationDelay: "300ms" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#7a7ffb]/10 flex items-center justify-center mb-6 border border-[#7a7ffb]/30">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Private Journaling Space</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Your thoughts stay private with secure authentication and protected entries.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div 
            className={`p-8 rounded-xl shadow-lg hover:translate-y-[-8px] transition-all duration-500 animate-fade-up ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-black to-[#131225] hover:shadow-[#7a7ffb]/20'
                : 'bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg border border-gray-200'
            }`}
            style={{ animationDelay: "400ms" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#7a7ffb]/10 flex items-center justify-center mb-6 border border-[#7a7ffb]/30">
              <span className="text-2xl">😊</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Mood Tracking</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Capture your emotional state with our intuitive mood selector featuring 10 different emotions.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div 
            className={`p-8 rounded-xl shadow-lg hover:translate-y-[-8px] transition-all duration-500 animate-fade-up ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-black to-[#131225] hover:shadow-[#7a7ffb]/20'
                : 'bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg border border-gray-200'
            }`}
            style={{ animationDelay: "500ms" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#7a7ffb]/10 flex items-center justify-center mb-6 border border-[#7a7ffb]/30">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Daily Reflections</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Easily organize and access your entries by date with our clean, minimalist interface.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div 
            className={`p-8 rounded-xl shadow-lg hover:translate-y-[-8px] transition-all duration-500 animate-fade-up ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-black to-[#131225] hover:shadow-[#7a7ffb]/20'
                : 'bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg border border-gray-200'
            }`}
            style={{ animationDelay: "600ms" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#7a7ffb]/10 flex items-center justify-center mb-6 border border-[#7a7ffb]/30">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Customizable Profile</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Make Mirror your own by personalizing your profile with your information and preferences.
            </p>
          </div>
          
          {/* Feature 5 */}
          <div 
            className={`p-8 rounded-xl shadow-lg hover:translate-y-[-8px] transition-all duration-500 animate-fade-up ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-black to-[#131225] hover:shadow-[#7a7ffb]/20'
                : 'bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg border border-gray-200'
            }`}
            style={{ animationDelay: "700ms" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#7a7ffb]/10 flex items-center justify-center mb-6 border border-[#7a7ffb]/30">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Distraction-Free Writing</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Our clean interface eliminates distractions, allowing you to focus solely on your thoughts.
            </p>
          </div>
          
          {/* Feature 6 - Extra feature to complete the grid */}
          <div 
            className={`p-8 rounded-xl shadow-lg hover:translate-y-[-8px] transition-all duration-500 animate-fade-up ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-black to-[#131225] hover:shadow-[#7a7ffb]/20'
                : 'bg-gradient-to-br from-gray-50 to-blue-50 hover:shadow-lg border border-gray-200'
            }`}
            style={{ animationDelay: "800ms" }}
          >
            <div className="w-16 h-16 rounded-full bg-[#7a7ffb]/10 flex items-center justify-center mb-6 border border-[#7a7ffb]/30">
              <span className="text-2xl">🌙</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Theme Customization</h3>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Choose between light and dark themes perfect for any time of day journaling sessions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
