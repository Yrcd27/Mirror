import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiSmile, FiImage, FiTrash, FiSave, FiCalendar } from "react-icons/fi";

export default function NewEntry() {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [showMoodPicker, setShowMoodPicker] = useState(false);

  const moodOptions = [
    { label: "happy", emoji: "😃" },
    { label: "sad", emoji: "😢" },
    { label: "angry", emoji: "😡" },
    { label: "calm", emoji: "😌" },
    { label: "sleepy", emoji: "😴" }
  ];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("content", content);
      formData.append("mood", mood);
      if (imageFile) formData.append("image", imageFile);

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

  const handleReset = () => {
    setContent("");
    setMood("");
    setImageFile(null);
    setShowMoodPicker(false);
  };

  return (
    <div className="h-screen bg-black text-white flex justify-center">
      <div className="relative w-full max-w-3xl px-4 pt-16 pb-36">

        {/* Close Button */}
        <Link to="/dashboard">
          <button
            className="absolute top-4 right-4 bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700 text-3xl"
            title="Close"
          >
            &times;
          </button>
        </Link>

        {/* Textarea */}
        <textarea
          className="w-full bg-black text-white outline-none text-lg resize-none overflow-y-auto"
          style={{ height: "calc(100vh - 200px)", paddingBottom: "80px" }}
          placeholder="Take a moment to reflect... what's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Mood Picker Popup */}
        {showMoodPicker && (
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-xl shadow-lg flex space-x-2 z-50">
            {moodOptions.map((m) => (
              <span
                key={m.label}
                className="text-2xl cursor-pointer hover:scale-125 transition"
                title={m.label}
                onClick={() => {
                  setMood(m.emoji);
                  setShowMoodPicker(false);
                }}
              >
                {m.emoji}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Panel */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl px-4">
          <div className="flex items-center justify-between bg-white text-black px-5 py-3 rounded-full shadow-xl text-lg space-x-2">

            {/* Date */}
            <div className="flex items-center space-x-1 text-sm font-medium pl-2">
              <FiCalendar className="text-2xl" />
              <span className="text-sm">{today.toUpperCase()}</span>
            </div>

            {/* Mood Selector */}
            <button
              onClick={() => setShowMoodPicker(!showMoodPicker)}
              className="text-2xl hover:scale-110 transition"
              title="Select Mood"
            >
              {mood || <FiSmile />}
            </button>

            {/* Image Upload */}
            <label className="cursor-pointer text-2xl hover:scale-110 transition" title="Add Image">
              <FiImage />
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </label>

            {/* Clear Entry */}
            <button
              onClick={handleReset}
              className="text-2xl hover:scale-110 transition"
              title="Clear Entry"
            >
              <FiTrash />
            </button>

            {/* Save Button */}
            <button
              onClick={handleSubmit}
              className="text-2xl text-white bg-black rounded-full p-2 hover:bg-gray-900 transition"
              title="Save Entry"
            >
              <FiSave />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
