import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function JournalView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const moods = ["😀", "😢", "😡", "😌", "😴"];

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
      if (imageFile) {
        formData.append("image", imageFile);
      }

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

  return (
    <div className="h-screen flex flex-col p-8 bg-black text-white">
      <textarea
        className="flex-1 bg-black text-white outline-none text-lg"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {image && (
        <img
          src={`data:image/jpeg;base64,${image}`}
          alt="Journal"
          className="my-4 max-w-xs rounded"
        />
      )}

      <div className="flex items-center justify-between bg-white text-black p-2 rounded-full mt-4">
        <span>{new Date().toDateString()}</span>

        {/* Mood Selector */}
        <div className="flex items-center space-x-2">
          {mood ? (
            <span
              className="text-2xl cursor-pointer"
              onClick={() => setMood("")}
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
