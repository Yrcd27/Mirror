import React from "react";
import heroImage from "../assets/mirror-hero.jpg"; // replace with your image path

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-start justify-between px-20 py-10 gap-50 min-h-[500px]">
      {/* Left Column */}
      <div className="md:w-1/2 space-y-6">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Mirror your <br /> journey, not just <br /> your reflection.
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base py-2 leading-relaxed">
          A calm space to write your thoughts and feelings. Reflect on your day, add images if you like, and keep your entries private.  
          Your mind. Your words. Your space.
        </p>

        {/* Button */}
        <button className="bg-black text-white px-6 py-3 rounded-md text-lg hover:bg-gray-800 transition">
          Get Started
        </button>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
        <img
          src={heroImage}
          alt="Mirror Reflection"
          className="h-[400px] w-[400px] rounded"
        />
      </div>
    </section>
  );
}
