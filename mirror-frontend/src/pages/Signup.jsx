import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // ✅ Import navigate hook and Link
import signupImage from "../assets/signup-image.png"; // replace with your image path

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // ✅ Create navigate instance

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password";

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
    if (formData.password && !passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        Name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // ✅ Optional: if backend sends a token after signup, store it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ Navigate to dashboard
      navigate("/dashboard");

    } catch (err) {
      setErrors({ api: err.response?.data?.message || "Signup failed" });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - image */}
      <div className="w-1/2 flex justify-center bg-gray-100">
        <img src={signupImage} alt="Signup" className="max-w-sm rounded-lg" />
      </div>

      {/* Right side - form */}
      <div className="w-1/2 flex flex-col justify-start px-25 pt-25">
        <h1 className="text-4xl font-bold mb-4">Sign up</h1>
        <p className="text-gray-400 mb-8">
          Let’s get you all set up so you can access your personal account.
        </p>

        {errors.api && <p className="text-red-500 mb-4">{errors.api}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              name="name"
              placeholder="Name"
              className="w-full border px-4 py-2 rounded"
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border px-4 py-2 rounded"
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border px-4 py-2 rounded"
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full border px-4 py-2 rounded"
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#7a7ffb] text-white py-2 rounded hover:bg-gray-800"
          >
            Create account
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
