import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JournalDashboard() {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/journals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJournals(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJournals();
  }, []);

  const currentDate = new Date();
  const currentMonthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex">
      {/* Sidebar space */}
      <div className="w-50 hidden md:block"></div>

      {/* Main content */}
      <div className="flex-1 bg-white min-h-screen px-6 sm:px-10 md:px-20 lg:px-40 py-16">
        <div className="flex flex-col items-start space-y-6">
          {/* Header */}
          <h1 className="text-3xl font-bold mb-8 py-1">Journal</h1>
          <p className="text-lg text-gray-600 mb-5">{currentMonthYear}</p>

          {/* Journal List */}
          <div className="space-y-4">
            {journals.map((j) => {
              const date = new Date(j.createdAt);
              const weekday = date.toLocaleDateString("en-US", {
                weekday: "short",
              });
              const day = date.getDate().toString().padStart(2, "0");

              return (
                <div
                  key={j._id}
                  onClick={() => navigate(`/journal/${j._id}`)}
                  className="bg-black text-white px-6 py-4 rounded-2xl cursor-pointer hover:bg-gray-800 transition duration-200 shadow-md flex items-center gap-4 h-28 max-w-[950px] w-full overflow-hidden"
                >
                  {/* Date Box */}
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-gray-900 rounded-xl font-bold shrink-0">
                    <div className="text-xs text-gray-400 uppercase">{weekday}</div>
                    <div className="text-2xl text-white">{day}</div>
                  </div>

                  {/* Content Box */}
                  <div className="flex-1 overflow-hidden">
                    <p className="text-white text-sm leading-snug line-clamp-3">
                      {j.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
