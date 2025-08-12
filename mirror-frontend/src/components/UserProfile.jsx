import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/default-profile.png";

export default function UserProfile() {
  const [profile, setProfile] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  // open the modal
  const handleDelete = () => setShowConfirm(true);

  // actually delete
  const performDelete = useCallback(async () => {
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  }, [navigate]);

  return (
    <div
      className="
        ml-60
        flex-1 min-h-screen px-6 sm:px-10 md:px-20 lg:px-30 py-15
        text-white
      "
      style={{
        background:
          "radial-gradient(1200px 800px at 20% 0%, #2b212f 0%, #131225 60%, #0c0b18 100%)",
      }}
    >
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-10">
        <label className="cursor-pointer">
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
            className="w-24 h-24 rounded-full object-cover border border-white/20 shadow-lg"
          />
        </label>

        <div>
          <h2 className="text-2xl font-semibold">
            {profile.Name || "User Name"}
          </h2>
          <p className="text-white/70">
            {profile.email || "user@email.com"}
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/80 mb-1">Full Name</label>
          <input
            placeholder="Full Name"
            value={profile.full_name || ""}
            onChange={(e) =>
              setProfile({ ...profile, full_name: e.target.value })
            }
            className="w-full rounded px-4 py-2
                       bg-white/5 border border-white/10 text-white
                       placeholder-white/60
                       focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <div>
          <label className="block text-white/80 mb-1">Gender</label>
          <select
            value={profile.gender || ""}
            onChange={(e) =>
              setProfile({ ...profile, gender: e.target.value })
            }
            className="w-full rounded px-4 py-2
                       bg-white/5 border border-white/10 text-white
                       focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <option value="">Select Gender</option>
            <option className="text-black" value="Male">Male</option>
            <option className="text-black" value="Female">Female</option>
            <option className="text-black" value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-white/80 mb-1">Date of Birth</label>
          <input
            type="date"
            value={profile.date_of_birth?.split("T")[0] || ""}
            onChange={(e) =>
              setProfile({ ...profile, date_of_birth: e.target.value })
            }
            className="w-full rounded px-4 py-2
                       bg-white/5 border border-white/10 text-white
                       focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>

        <div>
          <label className="block text-white/80 mb-1">Phone Number</label>
          <input
            placeholder="Phone Number"
            value={profile.phone_number || ""}
            onChange={(e) =>
              setProfile({ ...profile, phone_number: e.target.value })
            }
            className="w-full rounded px-4 py-2
                       bg-white/5 border border-white/10 text-white
                       placeholder-white/60
                       focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-white/80 mb-1">Bio</label>
        <textarea
          placeholder="Bio"
          value={profile.bio || ""}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="w-full h-28 resize-none rounded px-4 py-2
                     bg-white/5 border border-white/10 text-white
                     placeholder-white/60
                     focus:outline-none focus:ring-2 focus:ring-white/30"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-8">
        <button
          onClick={handleDelete}
          className="bg-[#7a7ffb] hover:bg-[#676cff] text-white px-6 py-2 rounded shadow"
        >
          Delete
        </button>

        <button
          onClick={handleSave}
          className="px-6 py-2 rounded shadow
                     bg-white/10 hover:bg-white/20
                     border border-white/20 text-white"
        >
          Save
        </button>
      </div>

      {/* Confirm Delete Modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowConfirm(false)}
          />
          {/* Dialog */}
          <div className="relative z-10 w-11/12 max-w-md rounded-2xl bg-[#1c1b2a] text-white border border-white/10 shadow-xl p-6">
            <h3 className="text-lg font-semibold">Delete account?</h3>
            <p className="mt-2 text-white/80">
              This action can’t be undone. Your profile and data will be removed.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded border border-white/20 bg-white/10 hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={performDelete}
                disabled={deleting}
                className={`px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white ${
                  deleting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
