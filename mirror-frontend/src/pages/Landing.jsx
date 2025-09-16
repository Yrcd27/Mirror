import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import WhyJournalSection from "../components/WhyJournalSection"; // Assuming you have a WhyJournalSection component
import FeaturesSection from "../components/FeaturesSection"; // Assuming you have a FeaturesSection component
import HowItWorksSection from "../components/HowItWorksSection"; // Assuming you have a HowItWorksSection component
import TestimonialsSection from "../components/TestimonialsSection"; // Assuming you have a TestimonialsSection component
import PromptsSection from "../components/PromptsSection"; // Assuming you have a PromptsSection component
import CtaSection from "../components/CtaSection"; // Assuming you have a CtaSection component
import FooterSection from "../components/FooterSection"; // Assuming you have a FooterSection component
import { scrollToElement } from "../utils/scrollUtils";

export default function Landing() {
  // Handle fragment identifier in URL for direct section navigation
  useEffect(() => {
    // Check if URL contains a hash and scroll to that section
    const { hash } = window.location;
    if (hash) {
      // Remove the # symbol and scroll to element with delay to ensure DOM is ready
      const id = hash.substring(1);
      setTimeout(() => {
        scrollToElement(id, 60);
      }, 100);
    }
  }, []);
  return (
    <div className="scroll-smooth">
      <Navbar />
      <div id="hero"><HeroSection /></div>
      <div id="whyJournal"><WhyJournalSection /></div>
      <div id="features"><FeaturesSection /></div>
      <div id="how-it-works"><HowItWorksSection /></div>
      <div id="testimonials"><TestimonialsSection /></div>
      <div id="prompts"><PromptsSection /></div>
      <CtaSection />
      <div id="footer"><FooterSection /></div>
    </div>
  );
}
