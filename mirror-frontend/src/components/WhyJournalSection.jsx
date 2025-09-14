import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function WhyJournalSection() {
  const { theme } = useTheme();
  
  return (
    <section className={`py-24 px-6 md:px-12 overflow-hidden theme-transition ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-black'
    }`}>
      <div className="max-w-6xl mx-auto">
        {/* Section heading with animation */}
        <h2 
          className="text-3xl md:text-5xl font-bold mb-10 animate-fade-up"
          style={{
            animationDelay: "100ms",
            fontFamily: "'Sansation', sans-serif",
          }}
        >
          Why Journal with Mirror?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side content */}
          <div className="space-y-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            <p className={`text-lg md:text-xl leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Journaling is more than just recording events—it's about understanding yourself. 
              Mirror provides a digital safe space to reflect on your thoughts, explore your 
              feelings, and track your personal growth journey.
            </p>
            
            {/* Quote with styling */}
            <blockquote className={`border-l-4 border-[#7a7ffb] pl-6 py-2 italic ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              "In the journal I do not just express myself more openly than I could do to any person; 
              I create myself."
              <footer className="text-[#7a7ffb] mt-2 font-semibold">— Susan Sontag</footer>
            </blockquote>
          </div>
          
          {/* Right side - Visual element with gradient */}
          <div className="rounded-2xl overflow-hidden shadow-xl h-80 relative animate-fade-up" 
               style={{ animationDelay: "300ms" }}>
            <div className={`absolute inset-0 opacity-70 ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-[#131225] to-[#2b212f]' 
                : 'bg-gradient-to-r from-blue-100 to-purple-100'
            }`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full flex">
                <div className={`w-1/2 flex items-center justify-center border-r ${
                  theme === 'dark' ? 'border-white/10' : 'border-gray-300'
                }`}>
                  <div className="text-center p-6">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center border ${
                      theme === 'dark' 
                        ? 'bg-black/30 border-white/20' 
                        : 'bg-white/50 border-gray-400'
                    }`}>
                      <span className="text-2xl">✍️</span>
                    </div>
                    <p className="text-sm md:text-base font-medium">Journaling</p>
                  </div>
                </div>
                <div className="w-1/2 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#7a7ffb]/20 
                                  flex items-center justify-center border border-[#7a7ffb]/40">
                      <span className="text-2xl">✨</span>
                    </div>
                    <p className="text-sm md:text-base font-medium">Growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Benefits subsection */}
        <div className="mt-20">
          <h3 
            className="text-xl md:text-2xl font-bold mb-10 animate-fade-up"
            style={{ 
              animationDelay: "400ms",
              fontFamily: "'Sansation', sans-serif"
            }}
          >
            Benefits of Journaling
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Benefit 1 */}
            <div 
              className={`p-6 rounded-xl transition-all duration-300 border animate-fade-up ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 border-white/10'
                  : 'bg-white hover:bg-gray-50 border-gray-200 shadow-sm'
              }`}
              style={{ animationDelay: "500ms" }}
            >
              <div className="text-2xl mb-4 text-[#7a7ffb]">🧠</div>
              <h4 className="font-bold text-lg mb-2">Mental Clarity</h4>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Transform scattered thoughts into organized reflections
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div 
              className={`p-6 rounded-xl transition-all duration-300 border animate-fade-up ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 border-white/10'
                  : 'bg-white hover:bg-gray-50 border-gray-200 shadow-sm'
              }`}
              style={{ animationDelay: "600ms" }}
            >
              <div className="text-2xl mb-4 text-[#7a7ffb]">❤️</div>
              <h4 className="font-bold text-lg mb-2">Emotional Processing</h4>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Understand and navigate complex emotions through written expression
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div 
              className={`p-6 rounded-xl transition-all duration-300 border animate-fade-up ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 border-white/10'
                  : 'bg-white hover:bg-gray-50 border-gray-200 shadow-sm'
              }`}
              style={{ animationDelay: "700ms" }}
            >
              <div className="text-2xl mb-4 text-[#7a7ffb]">🧘</div>
              <h4 className="font-bold text-lg mb-2">Stress Reduction</h4>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Release daily tensions and find calm through journaling practice
              </p>
            </div>
            
            {/* Benefit 4 */}
            <div 
              className={`p-6 rounded-xl transition-all duration-300 border animate-fade-up ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 border-white/10'
                  : 'bg-white hover:bg-gray-50 border-gray-200 shadow-sm'
              }`}
              style={{ animationDelay: "800ms" }}
            >
              <div className="text-2xl mb-4 text-[#7a7ffb]">📈</div>
              <h4 className="font-bold text-lg mb-2">Personal Growth</h4>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Track your journey and witness your evolution over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
