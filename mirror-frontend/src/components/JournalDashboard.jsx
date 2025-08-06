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
          headers: { Authorization: `Bearer ${token}` }
        });
        setJournals(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchJournals();
  }, []);

  return (
    <div className="flex">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold">Journal</h1>
        <p className="text-gray-500 mb-6">August 2025</p>
        <div className="space-y-4">
          {journals.map((j) => (
            <div
              key={j._id}
              className="bg-black text-white p-4 rounded-lg cursor-pointer hover:bg-gray-800"
              onClick={() => navigate(`/journal/${j._id}`)}
            >
              <p>{new Date(j.createdAt).toDateString()}</p>
              <p className="truncate">{j.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
