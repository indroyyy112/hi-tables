import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Check,
  Smartphone,
  ChevronDown,
  Utensils,
  Wifi,
  ThumbsUp,
  CalendarDays,
  Receipt,
  Sparkles,
} from "lucide-react";
import { BackgroundVideo } from "./BackgroundVideo.tsx";

interface HeroProps {
  onScrollToTouchpoints: () => void;
  onSubmittedEmail?: (email: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToTouchpoints,
  onSubmittedEmail,
}) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [placeholderText, setPlaceholderText] = useState<string>("");

  const placeholderInitial = "Enter Your Work Email For Early Access";
  const placeholderSuccess = "We Have Reserved Your Pilot Onboarding";

  useEffect(() => {
    if (!isFormOpen) {
      setPlaceholderText("");
      return;
    }

    const targetText = isSubmitted ? placeholderSuccess : placeholderInitial;
    let currentIndex = 0;
    setPlaceholderText("");

    const intervalId = setInterval(() => {
      if (currentIndex <= targetText.length) {
        setPlaceholderText(targetText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 45);

    return () => clearInterval(intervalId);
  }, [isFormOpen, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setIsFormOpen(false);
        setEmail("");
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitted(true);
    if (onSubmittedEmail) {
      onSubmittedEmail(email);
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] min-h-[640px] flex flex-col items-center justify-between px-4 md:px-6 py-6 select-none overflow-hidden"
    >
      {/* 1. Full-screen Edge-to-Edge Moving Video of Cafe Crowd */}
      <BackgroundVideo />

      {/* 2. Top Spacer for Navbar */}
      <div className="h-16 w-full" />

      {/* 3. Central Overlaid Editorial Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center justify-center w-full gap-6 px-4">
        {/* Subtle Brand Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0A3420]"
        >
          <span className="px-3.5 py-1.5 rounded-full bg-white/90 border border-[#DCD6CB] shadow-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0A3420] animate-pulse" />
            <span>No Cashier Queues · Direct Table Hospitality</span>
          </span>
        </motion.div>

        {/* Oversized Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-[68px] font-normal tracking-[-0.02em] leading-[1.08] text-[#1F2421] max-w-3xl drop-shadow-2xs"
        >
          A better experience starts{" "}
          <span
            style={{ fontFamily: "Georgia, serif" }}
            className="italic text-[#0A3420]"
          >
            at the table.
          </span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-base sm:text-lg text-[#2C332E] max-w-2xl font-normal leading-relaxed drop-shadow-2xs"
        >
          No waiting in line to order or pay. Guests tap or scan the table token to order food & drinks, connect to Wi-Fi, split the bill, and reserve tables.
        </motion.p>

        {/* Typewriter Email CTA & Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="min-h-[52px] flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full mt-1"
        >
          <AnimatePresence mode="wait">
            {!isFormOpen ? (
              <motion.button
                key="cta-btn"
                onClick={() => setIsFormOpen(true)}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="px-8 py-3.5 text-[14px] font-semibold rounded-full bg-[#0A3420] hover:bg-[#1B4D36] text-[#F9F7F0] transition-colors duration-200 cursor-pointer shadow-md flex items-center gap-2 group"
              >
                <span>Get early access</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
            ) : (
              <motion.form
                key="email-form"
                onSubmit={handleSubmit}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 text-[14px] font-medium border border-[#DCD6CB] rounded-full bg-white/95 shadow-md w-full max-w-[360px] focus-within:border-[#0A3420] transition-colors duration-200"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholderText}
                  autoFocus
                  disabled={isSubmitted}
                  required
                  className="bg-transparent text-[#1F2421] placeholder-[#525B55]/70 focus:outline-none flex-1 text-xs sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitted}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isSubmitted
                      ? "bg-[#0A3420] text-white"
                      : "bg-[#EAE5DC] hover:bg-[#0A3420] text-[#1F2421] hover:text-white cursor-pointer"
                  }`}
                  aria-label="Submit email"
                >
                  {isSubmitted ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <button
            onClick={onScrollToTouchpoints}
            className="px-6 py-3.5 text-[14px] font-medium text-[#1F2421] hover:text-[#0A3420] rounded-full bg-white/90 border border-[#DCD6CB] hover:bg-white transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Smartphone className="w-4 h-4 text-[#0A3420]" />
            <span>Simulate Table Session</span>
          </button>
        </motion.div>
      </div>

      {/* 4. Bottom Capability Pill Bar & Scroll Cue */}
      <div className="relative z-10 w-full flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-[#1F2421] bg-white/80 backdrop-blur-md px-5 py-2 rounded-full border border-[#DCD6CB] shadow-2xs">
          <span className="flex items-center gap-1.5 font-semibold text-[#0A3420]">
            <Utensils className="w-3.5 h-3.5" />
            <span>Order from Table</span>
          </span>
          <span className="text-[#DCD6CB]">·</span>
          <span className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5 text-[#0A3420]" />
            <span>Guest Wi-Fi</span>
          </span>
          <span className="text-[#DCD6CB]">·</span>
          <span className="flex items-center gap-1.5">
            <ThumbsUp className="w-3.5 h-3.5 text-[#0A3420]" />
            <span>Table Feedback</span>
          </span>
          <span className="text-[#DCD6CB]">·</span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-[#0A3420]" />
            <span>Reservations</span>
          </span>
          <span className="text-[#DCD6CB]">·</span>
          <span className="flex items-center gap-1.5">
            <Receipt className="w-3.5 h-3.5 text-[#0A3420]" />
            <span>Split Bill</span>
          </span>
        </div>

        <button
          onClick={onScrollToTouchpoints}
          className="flex items-center gap-1 text-xs text-[#525B55] hover:text-[#1F2421] transition-colors cursor-pointer pt-1"
        >
          <span>Explore table touchpoints</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#0A3420]" />
        </button>
      </div>
    </section>
  );
};
