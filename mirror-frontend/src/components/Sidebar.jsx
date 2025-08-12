import React, { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import logo from "../assets/logo192.png";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const performLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      window.location.href = "/";
    }, 500); // small delay for UI feedback
  };

  return (
    <div
      className={`bg-black text-white flex flex-col justify-between h-screen fixed top-0 left-0 py-6 transition-all duration-300 z-10 ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-center py-10">
          <img src={logo} alt="Mirror Logo" className="w-10 h-10 mr-2" />
          {isOpen && <span className="text-3xl font-bold">Mirror</span>}
        </div>

        {/* Menu Items */}
        <nav className="mt-6 flex flex-col items-center py-10 gap-10">
          <Link to="/dashboard" className="hover:text-[#7a7ffb] text-m font-bold">
            Journal
          </Link>
          <Link to="/profile" className="hover:text-[#7a7ffb] text-m font-bold">
            Profile
          </Link>
          <Link
            to="/new-entry"
            className="bg-[#7a7ffb] text-white w-40 py-2 rounded-full hover:bg-gray-200 hover:text-black text-center text-m font-bold"
          >
            + New Entry
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="py-6 text-center">
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center justify-center w-full hover:text-[#7a7ffb]"
        >
          <HiOutlineLogout size={20} />
          {isOpen && <span className="ml-2">Logout</span>}
        </button>
      </div>

      {/* Toggle Button (mobile view only) */}
      <button
        className="md:hidden absolute top-4 right-[-2rem] bg-black text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "<" : ">"}
      </button>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowConfirm(false)}
          />
          {/* Dialog */}
          <div className="relative z-10 w-11/12 max-w-md rounded-2xl bg-[#1c1b2a] text-white border border-white/10 shadow-xl p-6">
            <h3 className="text-lg font-semibold">Logout?</h3>
            <p className="mt-2 text-white/80">
              Are you sure you want to log out of your account?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded border border-white/20 bg-white/10 hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={performLogout}
                disabled={loggingOut}
                className={`px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white ${
                  loggingOut ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
