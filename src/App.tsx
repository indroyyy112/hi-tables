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
import { PromptExportDrawer } from "./components/PromptExportDrawer.tsx";
import { Sparkles } from "lucide-react";

export default function App() {
  const [promptDrawerOpen, setPromptDrawerOpen] = useState<boolean>(false);
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
      <Navbar
        onOpenPromptDrawer={() => setPromptDrawerOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* 2. Hero Section with Framed Cinematic Cafe Crowd Video */}
      <Hero
        onScrollToTouchpoints={() => scrollToSection("touchpoints")}
        onOpenPromptDrawer={() => setPromptDrawerOpen(true)}
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
      <EarlyAccessForm
        initialEmail={capturedEmail}
        onOpenPromptDrawer={() => setPromptDrawerOpen(true)}
      />

      {/* 9. Footer with Disclaimers & Brand Mirror */}
      <Footer
        onScrollToSection={scrollToSection}
        onOpenPromptDrawer={() => setPromptDrawerOpen(true)}
      />

      {/* 10. Slide-over Lovable Prompt Export Studio Drawer */}
      <PromptExportDrawer
        isOpen={promptDrawerOpen}
        onClose={() => setPromptDrawerOpen(false)}
      />

      {/* 11. Floating Quick-Access Pill for Prompt Studio */}
      <button
        onClick={() => setPromptDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-[#0A3420] hover:bg-[#1B4D36] text-[#F9F7F0] border border-[#1B4D36] shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold cursor-pointer hover:scale-105 transition-all group"
        aria-label="Open Lovable Master Prompt Drawer"
      >
        <Sparkles className="w-3.5 h-3.5 text-emerald-300 group-hover:rotate-12 transition-transform" />
        <span>Lovable Master Prompt</span>
      </button>
    </div>
  );
}
