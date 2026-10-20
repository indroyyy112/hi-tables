import React from "react";
import { Globe, ArrowUp } from "lucide-react";

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToSection,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 px-6 bg-[#EAE5DC] text-[#1F2421] border-t border-[#DCD6CB] relative">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#DCD6CB]">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#0A3420] flex items-center justify-center text-white">
                <Globe className="w-4 h-4" />
              </div>
              <span
                style={{ fontFamily: "Georgia, serif" }}
                className="text-2xl font-normal text-[#1F2421]"
              >
                Hi Tables!
              </span>
            </div>
            <p className="text-xs text-[#525B55] max-w-sm">
              A better guest experience starts at the table. Physical-to-digital hospitality for cafes and restaurants.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#525B55] font-medium">
            <button
              onClick={() => onScrollToSection("hero")}
              className="hover:text-[#1F2421] transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button
              onClick={() => onScrollToSection("sticker")}
              className="hover:text-[#1F2421] transition-colors cursor-pointer"
            >
              The Physical Token
            </button>
            <button
              onClick={() => onScrollToSection("touchpoints")}
              className="hover:text-[#1F2421] transition-colors cursor-pointer"
            >
              5 Touchpoints
            </button>
            <button
              onClick={() => onScrollToSection("features-spotlight")}
              className="hover:text-[#1F2421] transition-colors cursor-pointer"
            >
              Reserve & Split Bill
            </button>
            <button
              onClick={() => onScrollToSection("benefits")}
              className="hover:text-[#1F2421] transition-colors cursor-pointer"
            >
              Venue Benefits
            </button>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#DCD6CB] text-[#1F2421] hover:bg-[#F9F7F0] text-xs transition-colors cursor-pointer shrink-0 shadow-2xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Boundary Note & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#525B55]">
          <p>
            &copy; {new Date().getFullYear()} Hi Tables! Hospitality Technology. All rights reserved.
          </p>
          <p className="max-w-xl text-left sm:text-right">
            Hi Tables! provides Digital Menu, Guest Wi-Fi, Feedback, Table Reservations, and Bill Splitting. Reservation inventory and split bill payments are interactive design demonstrations.
          </p>
        </div>
      </div>
    </footer>
  );
};
