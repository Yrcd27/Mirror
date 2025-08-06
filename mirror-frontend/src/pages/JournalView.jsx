import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function JournalView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/journals/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setContent(res.data.content || "");
        setMood(res.data.mood || "");
        setImage(res.data.image || "");
      } catch (err) {
        console.error("Error fetching journal", err);
      }
    };
    fetchJournal();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/journals/${id}`,
        { content, mood, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating journal", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/journals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting journal", err);
    }
  };

  return (
    <div className="h-screen flex flex-col p-8 bg-black text-white">
      <textarea
        className="flex-1 bg-black text-white outline-none text-lg"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center justify-between bg-white text-black p-2 rounded-full mt-4">
        <span>{new Date().toDateString()}</span>
        <input
          placeholder="Mood (optional)"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <input
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-1 rounded-full"
        >
          Delete
        </button>
        <button
          onClick={handleUpdate}
          className="bg-black text-white px-4 py-1 rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}
