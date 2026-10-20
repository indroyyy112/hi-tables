/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Navbar } from "./components/Navbar.tsx";
import { Hero } from "./components/Hero.tsx";
import { StickerShowcase } from "./components/StickerShowcase.tsx";
import { InteractiveTouchpoints } from "./components/InteractiveTouchpoints.tsx";
import { FeatureSpotlights } from "./components/FeatureSpotlights.tsx";
import { HowItWorks } from "./components/HowItWorks.tsx";
import { VenueBenefits } from "./components/VenueBenefits.tsx";
import { EarlyAccessForm } from "./components/EarlyAccessForm.tsx";
import { Footer } from "./components/Footer.tsx";

export default function App() {
  const [capturedEmail, setCapturedEmail] = useState<string>("");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSimulateScan = (type: "qr" | "nfc") => {
    scrollToSection("touchpoints");
  };

  const handleSubmittedEmail = (email: string) => {
    setCapturedEmail(email);
    scrollToSection("early-access");
  };

  return (
    <div className="relative min-h-screen bg-[#F9F7F0] text-[#1F2421] flex flex-col overflow-x-hidden selection:bg-[#0A3420] selection:text-white">
      {/* 1. Floating Top Navigation Bar */}
      <Navbar onScrollToSection={scrollToSection} />

      {/* 2. Hero Section with Framed Cinematic Cafe Crowd Video */}
      <Hero
        onScrollToTouchpoints={() => scrollToSection("touchpoints")}
        onSubmittedEmail={handleSubmittedEmail}
      />

      {/* 3. Section A: The Physical Token Showcase */}
      <StickerShowcase onSimulateScan={handleSimulateScan} />

      {/* 4. Section B: 5 Interactive Guest Capabilities (Live Mobile Simulator) */}
      <InteractiveTouchpoints />

      {/* 5. Section C: Dedicated Feature Spotlights (Reserve a Table & Split the Bill) */}
      <FeatureSpotlights />

      {/* 6. Section D: How It Works in 3 Steps */}
      <HowItWorks />

      {/* 7. Section E: Venue Benefits for Hospitality Operators */}
      <VenueBenefits />

      {/* 8. Section F: B2B Early Access Partner Registration */}
      <EarlyAccessForm initialEmail={capturedEmail} />

      {/* 9. Footer with Disclaimers & Brand Mirror */}
      <Footer onScrollToSection={scrollToSection} />
    </div>
  );
}
