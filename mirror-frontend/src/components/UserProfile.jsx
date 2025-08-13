import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/default-profile.png";

export default function UserProfile() {
  const [profile, setProfile] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        // Start animation after data is loaded
        setTimeout(() => setAnimateIn(true), 100);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
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

      // Show success modal instead of alert
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
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
      {/* Add profile animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .profile-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: ${animateIn ? 1 : 0};
          transform: translateY(${animateIn ? '0' : '10px'});
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .profile-skeleton {
          background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
          background-size: 200% 100%;
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .modal-animation {
          animation: modalFadeIn 0.3s ease-out forwards;
        }
        @keyframes checkmarkAnimation {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        .checkmark-animation {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: checkmarkAnimation 0.8s ease-in-out forwards;
          animation-delay: 0.2s;
        }
      `}</style>

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-8 w-full">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full profile-skeleton"></div>
            <div className="space-y-2">
              <div className="h-7 w-40 rounded profile-skeleton"></div>
              <div className="h-5 w-32 rounded profile-skeleton"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-5 w-20 rounded profile-skeleton"></div>
                <div className="h-10 w-full rounded profile-skeleton"></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Profile Header */}
      {!loading && (
        <div className="flex items-center space-x-6 mb-10 profile-fade-in">
          <label className="cursor-pointer transition-transform duration-300 hover:scale-105">
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
      )}

      {/* Profile Form */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 profile-fade-in" style={{ animationDelay: "50ms" }}>
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
                           focus:outline-none focus:ring-2 focus:ring-white/30
                           transition-all duration-300 hover:border-white/20"
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
                        focus:outline-none focus:ring-2 focus:ring-white/30
                        transition-all duration-300 hover:border-white/20"
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
                        focus:outline-none focus:ring-2 focus:ring-white/30
                        transition-all duration-300 hover:border-white/20"
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
                        focus:outline-none focus:ring-2 focus:ring-white/30
                        transition-all duration-300 hover:border-white/20"
            />
          </div>
          </div>

          <div className="mt-6 profile-fade-in" style={{ animationDelay: "100ms" }}>
            <label className="block text-white/80 mb-1">Bio</label>
            <textarea
              placeholder="Bio"
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full h-28 resize-none rounded px-4 py-2
                        bg-white/5 border border-white/10 text-white
                        placeholder-white/60
                        focus:outline-none focus:ring-2 focus:ring-white/30
                        transition-all duration-300 hover:border-white/20"
            />
          </div>
        </>
      )}

      {/* Action Buttons */}
      {!loading && (
        <div className="flex space-x-4 mt-8 profile-fade-in" style={{ animationDelay: "150ms" }}>
          <button
            onClick={handleDelete}
            className="bg-[#7a7ffb] hover:bg-[#676cff] text-white px-6 py-2 rounded shadow
                      transition-all duration-300 transform hover:scale-105"
          >
            Delete
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-6 py-2 rounded shadow
                      bg-white/10 hover:bg-white/20
                      border border-white/20 text-white
                      transition-all duration-300 transform hover:scale-105
                      ${saving ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      )}

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
      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowSuccessModal(false)}
          />
          {/* Dialog */}
          <div className="relative z-10 w-11/12 max-w-md rounded-2xl bg-[#1c1b2a] text-white border border-white/10 shadow-xl p-6 modal-animation">
            <h3 className="text-lg font-semibold">Profile updated</h3>
            <p className="mt-2 text-white/80">
              Your profile has been updated successfully.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
