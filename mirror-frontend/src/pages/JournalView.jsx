import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  FiSmile,
  FiImage,
  FiTrash,
  FiSave,
  FiCalendar
} from "react-icons/fi";

export default function JournalView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [image, setImage] = useState("");
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
      const formData = new FormData();
      formData.append("content", content);
      formData.append("mood", mood);
      if (imageFile) formData.append("image", imageFile);

      await axios.put(`http://localhost:5000/api/journals/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

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

  const handleReset = () => {
    setContent("");
    setMood("");
    setImage("");
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

        {/* Text Area */}
        <textarea
          className="w-full bg-black text-white outline-none text-lg resize-none overflow-y-auto"
          style={{ height: "calc(100vh - 200px)", paddingBottom: "80px" }}
          placeholder="Take a moment to reflect... what's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Image Preview */}
        {image && !imageFile && (
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt="Uploaded"
            className="my-4 rounded-xl max-w-full h-auto"
          />
        )}

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
                onChange={(e) => {
                  setImageFile(e.target.files[0]);
                  setImage(""); // Clear old image preview
                }}
              />
            </label>

            {/* Delete Entry */}
            <button
              onClick={handleDelete}
              className="text-2xl hover:scale-110 text-red-600 transition"
              title="Delete Entry"
            >
              <FiTrash />
            </button>

            {/* Save Changes */}
            <button
              onClick={handleUpdate}
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
