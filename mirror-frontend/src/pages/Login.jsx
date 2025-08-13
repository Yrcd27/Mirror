import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import loginImage from "../assets/login-image.png";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (Object.keys(newErrors).length) return setErrors(newErrors);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      setSuccess("Login successful!");
      localStorage.setItem("token", res.data.token);
      formData.rememberMe
        ? localStorage.setItem("rememberedEmail", formData.email)
        : localStorage.removeItem("rememberedEmail");
      setTimeout(() => navigate("/dashboard"), 500);
    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Login failed" });
    }
  };

  return (
    // Align children to the TOP instead of center
    <div className="flex min-h-screen ">
      {/* Left Section - Form (moved up) */}
      <div className="w-1/2 flex flex-col justify-start px-25 pt-25">
        <h1 className="text-4xl font-bold mb-2">Login</h1>
        <p className="text-gray-400 mb-6">Login to access your Mirror account</p>

        {errors.api && <p className="text-red-500 mb-3">{errors.api}</p>}
        {success && <p className="text-green-500 mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john.doe@gmail.com"
              className="w-full border px-4 py-2 rounded"
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full border px-4 py-2 rounded"
              onChange={handleChange}
              value={formData.password}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm">Remember me</label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#7a7ffb] text-white py-2 rounded hover:bg-gray-800"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-4 text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-red-500">
            Sign up
          </Link>
        </p>
      </div>

      {/* Right Section - Image (unchanged) */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <img src={loginImage} alt="Login Illustration" className="max-w-sm" />
      </div>
    </div>
  );
}