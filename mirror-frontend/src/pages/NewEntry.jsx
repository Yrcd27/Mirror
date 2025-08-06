import React, { useState } from "react";
import axios from "axios";

export default function NewEntry() {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState(""); // emoji
  const [imageFile, setImageFile] = useState(null);

  const moods = ["😀", "😢", "😡", "😌", "😴"]; // journal moods

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("content", content);
      formData.append("mood", mood);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.post("http://localhost:5000/api/journals", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error saving journal:", err);
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

        {/* Mood Selector */}
        <div className="flex items-center space-x-2">
          {mood ? (
            <span
              className="text-2xl cursor-pointer"
              onClick={() => setMood("")} // reset mood if clicked
            >
              {mood}
            </span>
          ) : (
            moods.map((m) => (
              <span
                key={m}
                className="text-2xl cursor-pointer hover:scale-125 transition"
                onClick={() => setMood(m)}
              >
                {m}
              </span>
            ))
          )}
        </div>

        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-1 rounded-full"
        >
          Save
        </button>
      </div>
    </div>
  );
}
