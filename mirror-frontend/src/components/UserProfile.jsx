import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/default-profile.png"; // default image in assets

export default function UserProfile() {
  const [profile, setProfile] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
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
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      {/* Profile Picture */}
      <div className="flex items-center space-x-4">
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
            className="w-20 h-20 rounded-full cursor-pointer object-cover"
          />
        </label>
        <div>
          <p className="font-bold">{profile.Name}</p>
          <p>{profile.email}</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="mt-6 space-y-4">
        <input
          placeholder="Full Name"
          value={profile.full_name || ""}
          onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
          className="border p-2 w-full"
        />

        <select
          value={profile.gender || ""}
          onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="date"
          value={profile.date_of_birth?.split("T")[0] || ""}
          onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          placeholder="Phone Number"
          value={profile.phone_number || ""}
          onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Bio"
          value={profile.bio || ""}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
        <button
          onClick={handleSave}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
