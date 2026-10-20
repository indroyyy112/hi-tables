import React, { useState } from "react";
import { ArrowRight, Check, Building2, Mail, User } from "lucide-react";

interface EarlyAccessFormProps {
  initialEmail?: string;
}

export const EarlyAccessForm: React.FC<EarlyAccessFormProps> = ({
  initialEmail = "",
}) => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>(initialEmail);
  const [venueName, setVenueName] = useState<string>("");
  const [venueType, setVenueType] = useState<string>("specialty-coffee");
  const [tableCount, setTableCount] = useState<string>("10-25");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  React.useEffect(() => {
    if (initialEmail && !email) {
      setEmail(initialEmail);
    }
  }, [initialEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !venueName) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <section id="early-access" className="py-24 px-6 bg-[#F9F7F0] text-[#1F2421] relative border-t border-[#DCD6CB]">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <p className="text-[#0A3420] text-xs font-semibold tracking-[0.2em] uppercase">
            Partner With Hi Tables!
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-[#1F2421] tracking-tight">
            Make every table a{" "}
            <span style={{ fontFamily: "Georgia, serif" }} className="italic text-[#0A3420]">
              better experience.
            </span>
          </h2>
          <p className="text-[#525B55] text-base md:text-lg font-normal leading-relaxed">
            Bring a simpler, more thoughtful digital experience to your venue. Join early hospitality partners preparing for launch.
          </p>
        </div>

        {/* The Card / Form */}
        <div className="bg-white border border-[#DCD6CB] rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#1F2421] block">
                    Your Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#525B55]" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full pl-10 pr-4 py-3 bg-[#F9F7F0] border border-[#DCD6CB] rounded-xl text-sm text-[#1F2421] placeholder-[#525B55]/50 focus:outline-none focus:border-[#0A3420] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#1F2421] block">
                    Work or Contact Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#525B55]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@roasterycafe.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#F9F7F0] border border-[#DCD6CB] rounded-xl text-sm text-[#1F2421] placeholder-[#525B55]/50 focus:outline-none focus:border-[#0A3420] transition-colors"
                    />
                  </div>
                </div>

                {/* Venue Name */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#1F2421] block">
                    Venue or Establishment Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#525B55]" />
                    <input
                      type="text"
                      required
                      value={venueName}
                      onChange={(e) => setVenueName(e.target.value)}
                      placeholder="e.g. Botanica Artisan Roastery"
                      className="w-full pl-10 pr-4 py-3 bg-[#F9F7F0] border border-[#DCD6CB] rounded-xl text-sm text-[#1F2421] placeholder-[#525B55]/50 focus:outline-none focus:border-[#0A3420] transition-colors"
                    />
                  </div>
                </div>

                {/* Venue Category */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-[#1F2421] block">
                    Venue Category
                  </label>
                  <select
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F9F7F0] border border-[#DCD6CB] rounded-xl text-sm text-[#1F2421] focus:outline-none focus:border-[#0A3420] transition-colors cursor-pointer"
                  >
                    <option value="specialty-coffee">Specialty Coffee Shop & Roastery</option>
                    <option value="bakery-cafe">Artisan Bakery & Brunch Cafe</option>
                    <option value="bistro-restaurant">Boutique Bistro or Casual Dining</option>
                    <option value="hotel-hospitality">Boutique Hotel / Hospitality Group</option>
                    <option value="other">Other Hospitality Concept</option>
                  </select>
                </div>
              </div>

              {/* Table Count Selector */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#1F2421] block">
                  Approximate Table or Seating Stations
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "1-10", label: "1 – 10 Tables" },
                    { id: "11-25", label: "11 – 25 Tables" },
                    { id: "26-50", label: "26 – 50 Tables" },
                    { id: "50+", label: "50+ Tables / Multi-Site" },
                  ].map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => setTableCount(option.id)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        tableCount === option.id
                          ? "bg-[#0A3420] border-[#0A3420] text-white"
                          : "bg-[#F9F7F0] border-[#DCD6CB] text-[#525B55] hover:bg-[#EAE5DC]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#525B55]">
                  Early partners receive custom embossed sample tokens and priority onboarding.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0A3420] hover:bg-[#1B4D36] text-white font-medium text-sm rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Registering venue...</span>
                  ) : (
                    <>
                      <span>Submit Early Access Request</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center mx-auto">
                <Check className="w-7 h-7" />
              </div>
              <h3 style={{ fontFamily: "Georgia, serif" }} className="text-3xl font-normal text-[#1F2421]">
                Thank you, {fullName || "partner"}.
              </h3>
              <p className="text-sm text-[#525B55] max-w-lg mx-auto leading-relaxed">
                We have registered <strong>{venueName}</strong> for early access. Our team will reach out to <strong>{email}</strong> with pilot details and token samples.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#0A3420] underline font-medium cursor-pointer"
                >
                  Register another venue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
