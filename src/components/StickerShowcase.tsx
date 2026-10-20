import React, { useState, useRef } from "react";
import { Radio, QrCode, Utensils, Wifi, ThumbsUp, Check, ShieldCheck, Layers, Sparkles } from "lucide-react";

interface StickerShowcaseProps {
  onSimulateScan: (type: "qr" | "nfc") => void;
}

export const StickerShowcase: React.FC<StickerShowcaseProps> = ({
  onSimulateScan,
}) => {
  const [simulatedAction, setSimulatedAction] = useState<"qr" | "nfc" | null>(null);
  const [isShining, setIsShining] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 8,
      y: (x / (rect.width / 2)) * 8,
    });
  };

  const handleMouseEnter = () => {
    setIsShining(true);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsShining(false);
  };

  const triggerShine = () => {
    setIsShining(false);
    setTimeout(() => setIsShining(true), 20);
  };

  const handleAction = (type: "qr" | "nfc") => {
    setSimulatedAction(type);
    triggerShine();
    onSimulateScan(type);
    setTimeout(() => setSimulatedAction(null), 2500);
  };

  return (
    <section id="sticker" className="py-24 px-6 bg-[#F3F0E8] text-[#1F2421] relative border-t border-[#DCD6CB]">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-[#0A3420] text-xs font-semibold tracking-[0.2em] uppercase">
            The Physical Bridge
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-[#1F2421] tracking-tight">
            Order, Wi-Fi, and Feedback,{" "}
            <span style={{ fontFamily: "Georgia, serif" }} className="italic text-[#0A3420]">
              right at the table.
            </span>
          </h2>
          <p className="text-[#525B55] text-base md:text-lg font-normal leading-relaxed">
            One single physical touchpoint on the table eliminates friction for guests and staff alike. No apps to download, no searching for paper menus, and zero queuing at the cashier.
          </p>
        </div>

        {/* Sticker Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Physical Sticker Replica */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* The Physical Sticker Replica with 3D Tilt and Metallic Foil Shine */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={triggerShine}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.15s ease-out",
              }}
              className="relative group p-1.5 rounded-3xl bg-gradient-to-b from-white via-[#EAE5DC] to-[#DCD6CB] shadow-2xl cursor-pointer select-none"
            >
              <div className="w-[320px] sm:w-[360px] aspect-square rounded-[24px] bg-[#0A3420] text-white p-7 flex flex-col items-center justify-between relative overflow-hidden border border-emerald-600/30 shadow-[0_25px_60px_-15px_rgba(10,52,32,0.5)]">
                {/* 1. Dynamic Metallic Silver Foil Light Sweep / Shine */}
                <div
                  className={`absolute -inset-full pointer-events-none ${
                    isShining ? "animate-metallic-shine" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.2) 40%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0.2) 60%, transparent 80%)",
                    width: "250%",
                    height: "250%",
                  }}
                />

                {/* Silver foil top ambient reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.18] pointer-events-none" />

                {/* Brand Wordmark: Hi Tables! */}
                <div className="text-center relative z-10 pt-1">
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-md">
                    Hi Tables!
                  </h3>
                </div>

                {/* Silver QR Code Container */}
                <div className="relative z-10 bg-[#E2E8F0] p-3 rounded-xl shadow-inner border border-white/40 flex items-center justify-center group-hover:scale-102 transition-transform">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-28 h-28 sm:w-32 sm:h-32 fill-[#0A3420]"
                  >
                    {/* Corner Finder 1 */}
                    <rect x="5" y="5" width="28" height="28" rx="4" />
                    <rect x="11" y="11" width="16" height="16" fill="#E2E8F0" />
                    <rect x="15" y="15" width="8" height="8" />

                    {/* Corner Finder 2 */}
                    <rect x="67" y="5" width="28" height="28" rx="4" />
                    <rect x="73" y="11" width="16" height="16" fill="#E2E8F0" />
                    <rect x="77" y="15" width="8" height="8" />

                    {/* Corner Finder 3 */}
                    <rect x="5" y="67" width="28" height="28" rx="4" />
                    <rect x="11" y="73" width="16" height="16" fill="#E2E8F0" />
                    <rect x="15" y="77" width="8" height="8" />

                    {/* QR Data Pattern Dots */}
                    <rect x="40" y="8" width="6" height="6" />
                    <rect x="50" y="8" width="6" height="6" />
                    <rect x="40" y="18" width="6" height="12" />
                    <rect x="54" y="24" width="8" height="8" />

                    <rect x="8" y="40" width="8" height="6" />
                    <rect x="22" y="40" width="6" height="6" />
                    <rect x="34" y="38" width="8" height="8" />
                    <rect x="48" y="40" width="12" height="6" />
                    <rect x="68" y="42" width="6" height="6" />
                    <rect x="82" y="40" width="10" height="6" />

                    <rect x="8" y="52" width="6" height="8" />
                    <rect x="24" y="50" width="10" height="6" />
                    <rect x="42" y="54" width="6" height="14" />
                    <rect x="54" y="52" width="14" height="6" />
                    <rect x="76" y="54" width="6" height="12" />
                    <rect x="88" y="52" width="6" height="6" />

                    <rect x="40" y="74" width="8" height="6" />
                    <rect x="54" y="72" width="6" height="14" />
                    <rect x="68" y="74" width="8" height="8" />
                    <rect x="84" y="72" width="10" height="6" />
                    <rect x="76" y="86" width="14" height="6" />
                  </svg>
                </div>

                {/* Subtitle: Tap or Scan to Order */}
                <div className="relative z-10 text-center">
                  <p className="text-sm sm:text-base font-semibold tracking-wide text-white/95">
                    Tap or Scan to Order
                  </p>
                </div>

                {/* The 3 Exact Capabilities Matching the Physical Design */}
                <div className="relative z-10 flex items-center justify-between w-full px-4 text-center text-white/90">
                  <div className="flex flex-col items-center gap-1">
                    <Utensils className="w-4 h-4 text-slate-200" />
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-200">
                      ORDER
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Wifi className="w-4 h-4 text-slate-200" />
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-200">
                      Wi-Fi
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ThumbsUp className="w-4 h-4 text-slate-200" />
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-200">
                      LEAVE FEEDBACK
                    </span>
                  </div>
                </div>

                {/* Bottom NFC Wave Marker: — ))) NFC — */}
                <div className="relative z-10 flex items-center justify-center gap-2 text-slate-200 w-full pt-1">
                  <div className="h-[1.5px] w-12 bg-white/40" />
                  <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase">
                    <Radio className="w-3.5 h-3.5 text-emerald-300" />
                    <span>NFC</span>
                  </div>
                  <div className="h-[1.5px] w-12 bg-white/40" />
                </div>

                {/* Botanical Corner Leaf Veins (matching the uploaded artwork) */}
                <svg
                  className="absolute bottom-1.5 left-1.5 w-14 h-14 text-white/40 stroke-current fill-none stroke-[1.2]"
                  viewBox="0 0 50 50"
                >
                  <path d="M 5,45 C 10,25 30,15 45,5 C 25,15 15,30 5,45 Z" />
                  <path d="M 5,45 Q 20,28 35,18" />
                  <path d="M 12,38 Q 22,35 28,26" />
                </svg>
                <svg
                  className="absolute bottom-1.5 right-1.5 w-14 h-14 text-white/40 stroke-current fill-none stroke-[1.2] -scale-x-100"
                  viewBox="0 0 50 50"
                >
                  <path d="M 5,45 C 10,25 30,15 45,5 C 25,15 15,30 5,45 Z" />
                  <path d="M 5,45 Q 20,28 35,18" />
                  <path d="M 12,38 Q 22,35 28,26" />
                </svg>
              </div>
            </div>

            {/* Interactive Simulation Triggers */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => handleAction("nfc")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A3420] text-white hover:bg-[#1B4D36] transition-all text-xs font-semibold cursor-pointer shadow-sm"
              >
                <Radio className="w-4 h-4 text-emerald-300" />
                <span>Simulate NFC Tap</span>
                {simulatedAction === "nfc" && <Check className="w-3.5 h-3.5 text-emerald-200 ml-1" />}
              </button>
              <button
                onClick={() => handleAction("qr")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#DCD6CB] text-[#1F2421] hover:bg-[#EAE5DC] transition-all text-xs font-semibold cursor-pointer shadow-xs"
              >
                <QrCode className="w-4 h-4 text-[#525B55]" />
                <span>Simulate QR Scan</span>
                {simulatedAction === "qr" && <Check className="w-3.5 h-3.5 text-[#0A3420] ml-1" />}
              </button>
            </div>
            <p className="text-[11px] text-[#525B55] mt-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#0A3420]" />
              <span>Hover or tap the sticker to trigger the metallic foil shine effect.</span>
            </p>
          </div>

          {/* Right Column: Physical & Hospitality Specifications */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl font-normal text-[#1F2421] tracking-tight">
                Precision-Engineered for Hospitality
              </h3>
              <p className="text-[#525B55] text-sm leading-relaxed">
                The Hi Tables! token is crafted with weather-sealed commercial vinyl engineered to withstand hot coffee cups, spills, continuous sanitizer wipe-downs, and lively dining service.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#DCD6CB] shadow-xs space-y-2 hover:border-[#0A3420] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center">
                  <Radio className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-[#1F2421]">Embedded NTAG213 NFC</h4>
                <p className="text-xs text-[#525B55] leading-normal">
                  Universal smartphone compatibility. 2–4cm tap range enables immediate URL launch without opening camera.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#DCD6CB] shadow-xs space-y-2 hover:border-[#0A3420] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center">
                  <QrCode className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-[#1F2421]">High-Contrast Silver QR</h4>
                <p className="text-xs text-[#525B55] leading-normal">
                  Optimized for dim evening restaurant lighting and bright outdoor sun glares with zero scanner lag.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#DCD6CB] shadow-xs space-y-2 hover:border-[#0A3420] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-[#1F2421]">Commercial Grade Vinyl</h4>
                <p className="text-xs text-[#525B55] leading-normal">
                  Waterproof, alcohol-resistant matte finish that prevents fingerprint smudges and scratching.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#DCD6CB] shadow-xs space-y-2 hover:border-[#0A3420] transition-colors">
                <div className="w-8 h-8 rounded-lg bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-[#1F2421]">Zero Maintenance</h4>
                <p className="text-xs text-[#525B55] leading-normal">
                  No batteries, zero charging, and dynamic cloud routing so menus and reservations update instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
