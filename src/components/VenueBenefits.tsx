import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, ShieldCheck, Zap, Eye, CalendarDays, Receipt, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";

export const VenueBenefits: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(0);

  const benefits = [
    {
      icon: <Zap className="w-5 h-5 text-[#0A3420]" />,
      title: "No Queuing at Cashier or Bar",
      description:
        "Guests order specialty coffee and brunch straight from their table session without standing in cashier lines or crowding the bar counter.",
      extra: "Reduces peak-hour bottleneck at the counter by up to 60%, speeding up kitchen ticket routing.",
    },
    {
      icon: <Receipt className="w-5 h-5 text-[#0A3420]" />,
      title: "Eliminate Check Splitting Hassles",
      description:
        "Large tables and brunch parties can divide checks by diner count or individual dishes, saving servers 10–15 minutes per group turnover.",
      extra: "Guests settle their individual portions with companion invite links without asking for multiple credit card swipes.",
    },
    {
      icon: <CalendarDays className="w-5 h-5 text-[#0A3420]" />,
      title: "Predictable Table Demand",
      description:
        "Direct pre-visit booking options allow prospective diners to secure table slots ahead of time, smoothing floor pacing throughout the shift.",
      extra: "Hosts gain upfront visibility into table headcounts and seating preferences across patio and main dining areas.",
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-[#0A3420]" />,
      title: "Private Table-Level Feedback",
      description:
        "Provide diners with a private, low-friction channel to share their thoughts before leaving the venue, preventing public negative reviews.",
      extra: "Direct alerts enable managers to resolve dining or coffee temperature issues before the guest walks out the door.",
    },
    {
      icon: <Eye className="w-5 h-5 text-[#0A3420]" />,
      title: "Agile Daily Offerings",
      description:
        "Update rotational single-origin coffees, daily pastries, and seasonal chef specials without reprinting paper inserts or disposing of physical menus.",
      extra: "Mark 86 sold-out bakery items in seconds from any browser without embarrassing staff apologies.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#0A3420]" />,
      title: "Zero App Download Friction",
      description:
        "Works immediately in any standard modern mobile browser. Guests never have to download a third-party app or create an account to interact.",
      extra: "Universal NFC and QR compatibility on iOS and Android ensures 100% guest participation.",
    },
  ];

  return (
    <section id="benefits" className="py-24 px-6 bg-[#F3F0E8] text-[#1F2421] border-t border-[#DCD6CB] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-[#0A3420] text-xs font-semibold tracking-[0.2em] uppercase">
            Hospitality Advantages
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-[#1F2421] tracking-tight">
            Thoughtfully built for{" "}
            <span style={{ fontFamily: "Georgia, serif" }} className="italic text-[#0A3420]">
              modern hospitality operators.
            </span>
          </h2>
          <p className="text-[#525B55] text-base font-normal">
            Tap any operational advantage to view detailed floor metrics and service impact.
          </p>
        </div>

        {/* 6 Benefit Cards with Tap-to-Expand Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => (
            <motion.div
              layout
              key={idx}
              onClick={() => setSelectedIdx(selectedIdx === idx ? null : idx)}
              className={`p-6 rounded-3xl bg-white border transition-all cursor-pointer shadow-xs ${
                selectedIdx === idx
                  ? "border-[#0A3420] shadow-md ring-1 ring-[#0A3420]/20"
                  : "border-[#DCD6CB] hover:border-[#0A3420]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center">
                  {b.icon}
                </div>
                <div className="text-xs text-[#0A3420] flex items-center gap-1 font-semibold">
                  <span>{selectedIdx === idx ? "Expanded" : "Tap for details"}</span>
                  {selectedIdx === idx ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>
              </div>
              <h3 className="font-semibold text-base text-[#1F2421] mb-1.5">{b.title}</h3>
              <p className="text-xs sm:text-sm text-[#525B55] leading-relaxed font-normal">
                {b.description}
              </p>

              <AnimatePresence>
                {selectedIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-3.5 mt-3.5 border-t border-[#DCD6CB] text-xs text-[#0A3420] font-medium flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#0A3420]" />
                    <span>{b.extra}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
