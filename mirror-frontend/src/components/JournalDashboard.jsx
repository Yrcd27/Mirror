import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";
import { useTheme } from "../context/ThemeContext";

function JournalSkeleton({ theme }) {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div 
          key={i} 
          className={`h-28 max-w-[950px] w-full rounded-2xl animate-pulse ${
            theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
          }`}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

export default function JournalDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const fetching = useRef(false); 
  const didFetchFirst = useRef(false); 
  const navigate = useNavigate();
  const { theme } = useTheme();

  const loadPage = async (p = 1, replace = false) => {
    if (fetching.current) return;
    fetching.current = true;
    try {
      setLoading(p === 1 && replace); 
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_BASE_URL}/api/journals?limit=10&page=${p}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { items: newItems, hasMore: more } = res.data;
      setItems(replace ? newItems : [...items, ...newItems]);
      setHasMore(more);
      setPage(p + 1);
      setFadeIn(true);
    } catch (err) {
      console.error(err);
    } finally {
      fetching.current = false;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (didFetchFirst.current) return;
    didFetchFirst.current = true;
    loadPage(1, true);
  }, []);  
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Group journals by month
  const groupedJournals = items.reduce((groups, journal) => {
    const date = new Date(journal.createdAt);
    const monthYear = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(journal);
    return groups;
  }, {});

  // Sort months in descending order (newest first)
  const sortedMonths = Object.keys(groupedJournals).sort((a, b) => {
    return new Date(b + " 1") - new Date(a + " 1");
  });

  return (
    <div
      className={`min-h-screen flex ${theme === 'dark' ? 'text-white' : 'text-black'}`}
      style={{
        background: theme === 'dark'
          ? "radial-gradient(1200px 800px at 20% 0%, #2b212f 0%, #131225 60%, #0c0b18 100%)"
          : "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      
      <div className="hidden md:block w-60 shrink-0" />

      
      <div className="flex-1 min-h-screen px-6 sm:px-10 md:px-20 lg:px-40 py-15">
        <div className="flex flex-col items-start space-y-6">
          
          <h1 className="text-4xl font-bold py-1" style={{
              fontFamily: "'Sansation', sans-serif",
            }}>Journal</h1>

         
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .fade-in {
              animation: fadeIn 0.5s ease-out forwards;
              opacity: 0;
            }
            .staggered-fade-in > * {
              animation: fadeIn 0.5s ease-out forwards;
              opacity: 0;
            }
            .staggered-fade-in > *:nth-child(1) { animation-delay: 0.05s; }
            .staggered-fade-in > *:nth-child(2) { animation-delay: 0.1s; }
            .staggered-fade-in > *:nth-child(3) { animation-delay: 0.15s; }
            .staggered-fade-in > *:nth-child(4) { animation-delay: 0.2s; }
            .staggered-fade-in > *:nth-child(5) { animation-delay: 0.25s; }
            .staggered-fade-in > *:nth-child(n+6) { animation-delay: 0.3s; }
          `}</style>

          {/* List / Skeleton / Empty */}
          {loading ? (
            <JournalSkeleton theme={theme} />
          ) : items.length === 0 ? (
            <div className={`fade-in ${theme === 'dark' ? 'text-white/70' : 'text-gray-500'}`}>
              No entries yet. Click <span className="font-semibold">+ New Entry</span> to start.
            </div>
          ) : (
            <div className="space-y-8">
              {sortedMonths.map((monthYear) => (
                <div key={monthYear} className="staggered-fade-in">
                  <h2 className={`text-lg mb-4 ${theme === 'dark' ? 'text-white/80' : 'text-gray-600'}`}>
                    {monthYear}
                  </h2>
                  <div className="space-y-4">
                    {groupedJournals[monthYear].map((j) => {
                      const date = new Date(j.createdAt);
                      const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
                      const day = date.getDate().toString().padStart(2, "0");
                      return (
                        <div
                          key={j._id}
                          onClick={() => navigate(`/journal/${j._id}`)}
                          className={`px-6 py-4 rounded-2xl cursor-pointer transition duration-200 shadow-md flex items-center gap-4 h-30 max-w-[950px] w-full overflow-hidden ${
                            theme === 'dark'
                              ? 'bg-black/90 text-white hover:bg-[#2b212f]'
                              : 'bg-white text-black hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          {/* Date */}
                          <div className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl font-bold shrink-0 ${
                            theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
                          }`}>
                            <div className={`text-xs uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{weekday}</div>
                            <div className="text-2xl">{day}</div>
                          </div>
                          {/* Excerpt */}
                          <div className="flex-1 overflow-hidden">
                            <p className="text-sm leading-snug line-clamp-3">{j.excerpt}</p>
                          </div>
                          {/* (Optional) mood */}
                          {j.mood && <span className="text-xl shrink-0">{j.mood}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {hasMore && (
                <button
                  onClick={() => loadPage(page)}
                  className={`mt-4 px-4 py-2 rounded transition ${
                    theme === 'dark'
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-black'
                  }`}
                >
                  Load more
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
