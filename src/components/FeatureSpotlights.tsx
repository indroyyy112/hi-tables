import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Utensils,
  CalendarDays,
  Receipt,
  Users,
  Check,
  ArrowRight,
  Link,
  Sparkles,
  Coffee,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const FeatureSpotlights: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string>("order");

  // Reservation card state
  const [selectedSlot, setSelectedSlot] = useState<string>("Tonight, 7:00 PM");
  const [partyCount, setPartyCount] = useState<number>(4);
  const [reservationConfirmed, setReservationConfirmed] = useState<boolean>(false);

  // Split bill card state
  const [splitMethod, setSplitMethod] = useState<"even" | "items">("even");
  const [diners, setDiners] = useState<number>(4);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const billTotal = 84.0;

  // Ordering card state
  const [orderedItems, setOrderedItems] = useState<string[]>(["Ethiopia Guji Pour-Over", "Almond Croissant"]);
  const [kitchenDispatched, setKitchenDispatched] = useState<boolean>(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://hitables.app/table/04/split?session=demo");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const toggleExpand = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? "" : cardId);
  };

  return (
    <section id="features-spotlight" className="py-24 px-6 bg-[#F3F0E8] text-[#1F2421] border-t border-[#DCD6CB] relative">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <p className="text-[#0A3420] text-xs font-semibold tracking-[0.2em] uppercase">
            Hospitality Superpowers
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-[#1F2421] tracking-tight">
            Tap any capability to{" "}
            <span style={{ fontFamily: "Georgia, serif" }} className="italic text-[#0A3420]">
              explore the live demonstration.
            </span>
          </h2>
          <p className="text-[#525B55] text-base font-normal leading-relaxed">
            Eliminate long cashier lines, streamline table reservations, and divide group checks effortlessly right at the table.
          </p>
        </div>

        {/* 3 Expandable Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* 1. ZERO CASHIER QUEUING / TABLE ORDERING */}
          <motion.div
            layout
            onClick={() => toggleExpand("order")}
            className={`p-7 rounded-3xl bg-white border transition-all cursor-pointer shadow-xs ${
              expandedCard === "order"
                ? "border-[#0A3420] shadow-md ring-1 ring-[#0A3420]/20"
                : "border-[#DCD6CB] hover:border-[#0A3420]/50"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A3420]">
                <span>{expandedCard === "order" ? "Expanded" : "Tap to test"}</span>
                {expandedCard === "order" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            <h3 className="text-xl font-normal text-[#1F2421] tracking-tight mb-2">
              Zero Cashier Queuing
            </h3>
            <p className="text-xs text-[#525B55] leading-relaxed mb-4">
              Guests sit comfortably and place coffee and food orders straight to the barista station without standing in line or crowding the bar.
            </p>

            <AnimatePresence>
              {expandedCard === "order" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="pt-3 border-t border-[#DCD6CB] space-y-3"
                >
                  <div className="p-3 bg-[#F9F7F0] rounded-xl space-y-2 text-xs">
                    <span className="font-semibold text-[#1F2421] block">Live Table 04 Ticket:</span>
                    <div className="space-y-1 text-[#525B55]">
                      {orderedItems.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                          <span>1x {item}</span>
                          <span className="text-[#0A3420] font-semibold">Ready</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setKitchenDispatched(!kitchenDispatched)}
                    className="w-full py-2.5 rounded-xl bg-[#0A3420] text-white text-xs font-semibold hover:bg-[#1B4D36] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {kitchenDispatched ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Dispatched to Barista Station!</span>
                      </>
                    ) : (
                      <>
                        <Coffee className="w-4 h-4" />
                        <span>Simulate Kitchen Dispatch</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#525B55] pt-1">
                    <span>Average service time saved:</span>
                    <strong className="text-[#0A3420] font-mono">12 mins / group</strong>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 2. PRE-VISIT TABLE RESERVATIONS */}
          <motion.div
            layout
            onClick={() => toggleExpand("reserve")}
            className={`p-7 rounded-3xl bg-white border transition-all cursor-pointer shadow-xs ${
              expandedCard === "reserve"
                ? "border-[#0A3420] shadow-md ring-1 ring-[#0A3420]/20"
                : "border-[#DCD6CB] hover:border-[#0A3420]/50"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center">
                <CalendarDays className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A3420]">
                <span>{expandedCard === "reserve" ? "Expanded" : "Tap to test"}</span>
                {expandedCard === "reserve" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            <h3 className="text-xl font-normal text-[#1F2421] tracking-tight mb-2">
              Pre-Visit Reservations
            </h3>
            <p className="text-xs text-[#525B55] leading-relaxed mb-4">
              Prospective diners choose their date, time slot, and party size before arriving with instant table hold confirmation.
            </p>

            <AnimatePresence>
              {expandedCard === "reserve" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="pt-3 border-t border-[#DCD6CB] space-y-3"
                >
                  <div className="p-3 bg-[#F9F7F0] rounded-xl space-y-2 text-xs">
                    <span className="font-semibold text-[#1F2421] block">Select Time & Party:</span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      {["Tonight 7:00 PM", "Tomorrow 12:30 PM"].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-1.5 rounded-lg border text-left font-medium transition-colors cursor-pointer ${
                            selectedSlot === slot
                              ? "bg-[#0A3420] text-white border-[#0A3420]"
                              : "bg-white text-[#1F2421] border-[#DCD6CB]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setReservationConfirmed(!reservationConfirmed)}
                    className="w-full py-2.5 rounded-xl bg-[#0A3420] text-white text-xs font-semibold hover:bg-[#1B4D36] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {reservationConfirmed ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Table for {partyCount} Confirmed!</span>
                      </>
                    ) : (
                      <>
                        <CalendarDays className="w-4 h-4" />
                        <span>Confirm Table Booking</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#525B55] pt-1">
                    <span>Floor management efficiency:</span>
                    <strong className="text-[#0A3420] font-mono">+35% predictable seating</strong>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* 3. COLLABORATIVE BILL SPLITTING */}
          <motion.div
            layout
            onClick={() => toggleExpand("split")}
            className={`p-7 rounded-3xl bg-white border transition-all cursor-pointer shadow-xs ${
              expandedCard === "split"
                ? "border-[#0A3420] shadow-md ring-1 ring-[#0A3420]/20"
                : "border-[#DCD6CB] hover:border-[#0A3420]/50"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center">
                <Receipt className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0A3420]">
                <span>{expandedCard === "split" ? "Expanded" : "Tap to test"}</span>
                {expandedCard === "split" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            <h3 className="text-xl font-normal text-[#1F2421] tracking-tight mb-2">
              Collaborative Bill Splitting
            </h3>
            <p className="text-xs text-[#525B55] leading-relaxed mb-4">
              Review table totals, divide evenly or itemized, and generate instant companion links for tablemates to settle their share.
            </p>

            <AnimatePresence>
              {expandedCard === "split" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="pt-3 border-t border-[#DCD6CB] space-y-3"
                >
                  <div className="p-3 bg-[#F9F7F0] rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-[#525B55]">Table Total:</span>
                      <span className="font-bold text-[#1F2421] font-mono">${billTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {[2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => setDiners(num)}
                          className={`flex-1 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            diners === num
                              ? "bg-[#0A3420] text-white border-[#0A3420]"
                              : "bg-white text-[#1F2421] border-[#DCD6CB]"
                          }`}
                        >
                          {num}p
                        </button>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-[#DCD6CB]">
                      <span className="font-medium text-[#1F2421]">Individual Share:</span>
                      <span className="font-bold text-sm text-[#0A3420] font-mono">
                        ${(billTotal / diners).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className="w-full py-2.5 rounded-xl bg-white border border-[#0A3420] text-[#0A3420] hover:bg-[#EAE5DC] text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#0A3420]" />
                        <span>Companion Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link className="w-3.5 h-3.5" />
                        <span>Copy Companion Payment Link</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#525B55] pt-1">
                    <span>Server time saved at checkout:</span>
                    <strong className="text-[#0A3420] font-mono">100% self-serve</strong>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
