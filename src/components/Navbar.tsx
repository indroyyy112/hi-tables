import React from "react";
import { motion } from "motion/react";
import { Globe, ArrowRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenPromptDrawer: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPromptDrawer,
  onScrollToSection,
}) => {
  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-40 px-4 md:px-6 py-4 w-full pointer-events-none"
    >
      <div className="stone-glass rounded-full px-5 md:px-7 py-2.5 flex items-center justify-between max-w-5xl mx-auto shadow-sm pointer-events-auto">
        {/* Left side: Brand Wordmark */}
        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              onScrollToSection("hero");
            }}
            className="flex items-center gap-2.5 text-[#1F2421] hover:opacity-85 transition-opacity group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-[#0A3420] flex items-center justify-center text-[#F9F7F0] shadow-xs group-hover:scale-105 transition-transform">
              <Globe className="w-3.5 h-3.5" />
            </div>
            <span
              style={{ fontFamily: "Georgia, serif" }}
              className="text-[#1F2421] font-semibold text-xl tracking-tight"
            >
              Hi Tables!
            </span>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-7 text-[#525B55] text-sm font-medium">
            <button
              onClick={() => onScrollToSection("sticker")}
              className="hover:text-[#1F2421] transition-colors duration-200 cursor-pointer"
            >
              The Token
            </button>
            <button
              onClick={() => onScrollToSection("touchpoints")}
              className="hover:text-[#1F2421] transition-colors duration-200 cursor-pointer"
            >
              5 Touchpoints
            </button>
            <button
              onClick={() => onScrollToSection("features-spotlight")}
              className="hover:text-[#1F2421] transition-colors duration-200 cursor-pointer"
            >
              Reserve & Split Bill
            </button>
            <button
              onClick={() => onScrollToSection("benefits")}
              className="hover:text-[#1F2421] transition-colors duration-200 cursor-pointer"
            >
              Venue Benefits
            </button>
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPromptDrawer}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#0A3420] bg-[#EAE5DC] border border-[#DCD6CB] hover:bg-[#E2DDD3] transition-colors cursor-pointer"
            title="Open Lovable Master Prompt & Assets"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1B4D36]" />
            <span>Prompt Studio</span>
          </button>

          <button
            onClick={() => onScrollToSection("early-access")}
            className="rounded-full px-5 py-2 text-xs md:text-sm font-medium text-[#F9F7F0] bg-[#0A3420] hover:bg-[#1B4D36] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <span>Get Early Access</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
};
