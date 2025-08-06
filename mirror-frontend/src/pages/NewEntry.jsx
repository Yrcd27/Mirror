import React, { useState } from "react";
import axios from "axios";

export default function NewEntry() {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/journals", 
        { content, mood, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex flex-col p-8 bg-black text-white">
      <textarea
        className="flex-1 bg-black text-white outline-none text-lg"
        placeholder="Start writing..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center justify-between bg-white text-black p-2 rounded-full mt-4">
        <span>Today</span>
        <input placeholder="Mood (optional)" value={mood} onChange={(e) => setMood(e.target.value)} />
        <input placeholder="Image URL (optional)" value={image} onChange={(e) => setImage(e.target.value)} />
        <button onClick={handleSubmit} className="bg-black text-white px-4 py-1 rounded-full">Save</button>
      </div>
    </div>
  );
}
