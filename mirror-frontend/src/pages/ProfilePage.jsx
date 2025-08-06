// src/pages/ProfilePage.jsx

import React from "react";
import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-white p-6 overflow-auto">
        <UserProfile />
      </div>
    </div>
  );
}
