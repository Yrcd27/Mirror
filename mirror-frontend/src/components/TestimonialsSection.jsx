import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function TestimonialsSection() {
  const { theme } = useTheme();
  
  return (
    <section className={`py-24 px-6 md:px-12 overflow-hidden theme-transition ${
      theme === 'dark' ? 'bg-[#0c0b18] text-white' : 'bg-gray-50 text-black'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-5xl font-bold mb-6 animate-fade-up"
            style={{
              animationDelay: "100ms",
              fontFamily: "'Sansation', sans-serif",
            }}
          >
            Reflections from Our Community
          </h2>
        </div>
        
        {/* Testimonials grid with perspective hover effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div 
            className={`p-8 md:p-10 rounded-xl shadow-lg relative overflow-hidden group animate-fade-up ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-[#131225] to-[#2b212f]' 
                : 'bg-white border border-gray-200'
            }`}
            style={{ 
              animationDelay: "200ms",
              transform: "perspective(1000px)",
              transition: "transform 0.5s ease"
            }}
          >
            {/* Purple glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#7a7ffb]/20 rounded-full blur-3xl group-hover:bg-[#7a7ffb]/30 transition-all duration-700"></div>
            
            <div className="relative z-10">
              {/* Quote marks */}
              <div className="text-6xl text-[#7a7ffb]/20 font-serif absolute -top-2 -left-2">"</div>
              
              {/* Testimonial text */}
              <p className={`mb-6 relative z-10 pt-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Mirror has become my daily companion for self-reflection. The simple interface makes it 
                so easy to express my thoughts without distractions.
              </p>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7a7ffb]/70 to-purple-500 flex items-center justify-center font-bold text-lg">
                  A
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Alex P.</p>
                  <p className="text-sm text-gray-400">Daily User</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial 2 */}
          <div 
            className={`p-8 md:p-10 rounded-xl shadow-lg relative overflow-hidden group animate-fade-up ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-[#131225] to-[#2b212f]' 
                : 'bg-white border border-gray-200'
            }`}
            style={{ 
              animationDelay: "300ms",
              transform: "perspective(1000px)", 
              transition: "transform 0.5s ease"
            }}
          >
            {/* Purple glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#7a7ffb]/20 rounded-full blur-3xl group-hover:bg-[#7a7ffb]/30 transition-all duration-700"></div>
            
            <div className="relative z-10">
              {/* Quote marks */}
              <div className="text-6xl text-[#7a7ffb]/20 font-serif absolute -top-2 -left-2">"</div>
              
              {/* Testimonial text */}
              <p className={`mb-6 relative z-10 pt-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                I love how the mood tracking feature helps me understand my emotional patterns over time. 
                It's been eye-opening!
              </p>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7a7ffb]/70 to-purple-500 flex items-center justify-center font-bold text-lg">
                  J
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Jamie L.</p>
                  <p className="text-sm text-gray-400">New User</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial 3 */}
          <div 
            className={`p-8 md:p-10 rounded-xl shadow-lg relative overflow-hidden group animate-fade-up ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-[#131225] to-[#2b212f]' 
                : 'bg-white border border-gray-200'
            }`}
            style={{ 
              animationDelay: "400ms",
              transform: "perspective(1000px)", 
              transition: "transform 0.5s ease"
            }}
          >
            {/* Purple glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#7a7ffb]/20 rounded-full blur-3xl group-hover:bg-[#7a7ffb]/30 transition-all duration-700"></div>
            
            <div className="relative z-10">
              {/* Quote marks */}
              <div className="text-6xl text-[#7a7ffb]/20 font-serif absolute -top-2 -left-2">"</div>
              
              {/* Testimonial text */}
              <p className={`mb-6 relative z-10 pt-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                As someone who struggled with consistent journaling, Mirror's clean design and ease of use 
                have finally made it a sustainable habit for me.
              </p>
              
              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7a7ffb]/70 to-purple-500 flex items-center justify-center font-bold text-lg">
                  T
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Taylor R.</p>
                  <p className="text-sm text-gray-400">New User</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Hover effect script */}
      <style jsx>{`
        .group:hover {
          transform: perspective(1000px) rotateX(2deg) rotateY(5deg) scale(1.03);
          box-shadow: 0 20px 40px rgba(122, 127, 251, ${theme === 'dark' ? '0.1' : '0.15'});
        }
      `}</style>
    </section>
  );
}
