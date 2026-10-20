import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: "01",
      title: "Affix to Table",
      description: "Place the water-resistant Hi Tables! token on indoor tables, patio counters, or bar seating. Zero wiring, zero hardware pairing, and no charging required.",
      badge: "Zero Hardware Setup",
      tip: "Takes under 10 seconds per table with high-tack commercial adhesive.",
    },
    {
      number: "02",
      title: "Tap or Scan",
      description: "Guests tap with an NFC-compatible smartphone or scan the high-contrast silver QR code with their camera. Immediate browser launch without an app store visit.",
      badge: "Instant Browser Launch",
      tip: "Works on all modern iPhone and Android devices with zero downloads.",
    },
    {
      number: "03",
      title: "Enjoy the Full Table Session",
      description: "Guests order coffee & food without queueing, connect to high-speed guest Wi-Fi, share private feedback, hold reservations, and split checks seamlessly.",
      badge: "Frictionless Hospitality",
      tip: "Average table turnover speeds up by 15% during peak rush hours.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#F9F7F0] text-[#1F2421] border-t border-[#DCD6CB] relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-[#0A3420] text-xs font-semibold tracking-[0.2em] uppercase">
            Simple Interactions
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-[#1F2421] tracking-tight">
            How it works in <span style={{ fontFamily: "Georgia, serif" }} className="italic text-[#0A3420]">three simple steps.</span>
          </h2>
          <p className="text-[#525B55] text-base font-normal">
            Tap any step card to see practical operational details.
          </p>
        </div>

        {/* 3 Step Cards Grid with Tap Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-8 rounded-3xl bg-white border transition-all cursor-pointer flex flex-col justify-between space-y-6 shadow-xs group ${
                activeStep === idx
                  ? "border-[#0A3420] shadow-md ring-1 ring-[#0A3420]/20"
                  : "border-[#DCD6CB] hover:border-[#0A3420]/40"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-light text-[#0A3420]">
                    {step.number}
                  </span>
                  <span className="text-[11px] font-mono text-[#0A3420] px-2.5 py-1 rounded bg-[#EAE5DC] border border-[#DCD6CB]">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-xl font-normal text-[#1F2421] tracking-tight">
                  {step.title}
                </h3>

                <p className="text-sm text-[#525B55] leading-relaxed font-normal">
                  {step.description}
                </p>

                {activeStep === idx && (
                  <div className="pt-2 text-xs text-[#0A3420] font-medium flex items-center gap-1.5 animate-fade-in border-t border-[#DCD6CB]/60">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{step.tip}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 text-xs text-[#0A3420] flex items-center gap-1.5 font-medium group-hover:translate-x-1 transition-transform">
                <span>Natural hospitality flow</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
