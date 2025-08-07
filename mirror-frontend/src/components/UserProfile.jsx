import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/default-profile.png";

export default function UserProfile() {
  const [profile, setProfile] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      Object.keys(profile).forEach((key) => {
        if (key !== "profile_picture") {
          formData.append(key, profile[key] || "");
        }
      });
      if (profilePic) formData.append("profile_picture", profilePic);

      await axios.post("http://localhost:5000/api/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile saved successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="ml-60 p-10 min-h-screen bg-white">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-10">
        <label>
          <input
            type="file"
            hidden
            accept="image/png,image/jpeg"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
          <img
            src={
              profile.profile_picture
                ? `data:image/jpeg;base64,${profile.profile_picture}`
                : defaultProfile
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-sm cursor-pointer"
          />
        </label>
        <div>
          <h2 className="text-2xl font-semibold">{profile.full_name || "User Name"}</h2>
          <p className="text-gray-600">{profile.email || "user@email.com"}</p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            placeholder="Full Name"
            value={profile.full_name || ""}
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Gender</label>
          <select
            value={profile.gender || ""}
            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
            className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-black"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={profile.date_of_birth?.split("T")[0] || ""}
            onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
            className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Phone Number</label>
          <input
            placeholder="Phone Number"
            value={profile.phone_number || ""}
            onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
            className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-black"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-gray-700 mb-1">Bio</label>
        <textarea
          placeholder="Bio"
          value={profile.bio || ""}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-black h-28 resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-8">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded shadow"
        >
          Delete
        </button>
        <button
          onClick={handleSave}
          className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded shadow"
        >
          Save
        </button>
      </div>
    </div>
  );
}
