import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Utensils,
  Wifi,
  ThumbsUp,
  CalendarDays,
  Receipt,
  Star,
  Copy,
  Check,
  Search,
  Signal,
  Battery,
  Send,
  Link,
  Plus,
  ShoppingBag,
  Sparkles,
  Coffee,
  CheckCircle2,
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: "coffee" | "bakery" | "beverage";
  price: string;
  priceNum: number;
  description: string;
  notes?: string;
  image: string;
  tags: string[];
}

const SAMPLE_MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Ethiopia Guji Filter Pour-Over",
    category: "coffee",
    price: "$5.50",
    priceNum: 5.5,
    description: "Light roast single origin with jasmine floral aroma, bergamot sweetness, and peach finish.",
    notes: "Notes: Jasmine · Bergamot · Peach",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    tags: ["Single Origin", "Light Roast"],
  },
  {
    id: "m2",
    name: "Velvet Flat White",
    category: "coffee",
    price: "$4.75",
    priceNum: 4.75,
    description: "Double ristretto extraction with micro-foamed organic whole milk or oat milk.",
    notes: "Notes: Hazelnut · Dark Cocoa",
    image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80",
    tags: ["Espresso", "Oat Available"],
  },
  {
    id: "m3",
    name: "Almond Frangipane Croissant",
    category: "bakery",
    price: "$5.25",
    priceNum: 5.25,
    description: "Twice-baked French butter croissant filled with almond frangipane cream and toasted sliced almonds.",
    notes: "Baked fresh daily at 6:30 AM",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80",
    tags: ["Artisan Bakery"],
  },
  {
    id: "m4",
    name: "Avocado & Whipped Ricotta Tartine",
    category: "bakery",
    price: "$13.50",
    priceNum: 13.5,
    description: "Toasted country sourdough, Meyer lemon whipped ricotta, sliced Hass avocado, pickled shallots, micro herbs.",
    notes: "Vegetarian · Sourdough",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    tags: ["Brunch", "Vegetarian"],
  },
  {
    id: "m5",
    name: "Sparkling Yuzu Cold Brew",
    category: "beverage",
    price: "$6.00",
    priceNum: 6.0,
    description: "18-hour cold steeped Colombian beans layered over Japanese yuzu puree and sparkling tonic.",
    notes: "Refreshing · Citrus Kick",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
    tags: ["House Refresher", "Chilled"],
  },
];

export const InteractiveTouchpoints: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"menu" | "wifi" | "feedback" | "reserve" | "split">("menu");

  // Menu & Table Ordering State
  const [menuFilter, setMenuFilter] = useState<"all" | "coffee" | "bakery" | "beverage">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [tableCart, setTableCart] = useState<{ item: MenuItem; count: number }[]>([
    { item: SAMPLE_MENU_ITEMS[0], count: 1 },
    { item: SAMPLE_MENU_ITEMS[2], count: 1 },
  ]);
  const [orderSent, setOrderSent] = useState<boolean>(false);

  // Wi-Fi State
  const [copiedWifi, setCopiedWifi] = useState<boolean>(false);
  const [wifiConnected, setWifiConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  // Feedback State
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Coffee Quality", "Cozy Ambiance"]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  // Reservation State
  const [reserveDate, setReserveDate] = useState<string>("Tonight, 7:00 PM");
  const [partySize, setPartySize] = useState<number>(4);
  const [seatingArea, setSeatingArea] = useState<string>("Main Dining Hall");
  const [guestName, setGuestName] = useState<string>("Alex Morgan");
  const [reservationHeld, setReservationHeld] = useState<boolean>(false);

  // Split-the-bill State
  const [splitMethod, setSplitMethod] = useState<"even" | "items" | "custom">("even");
  const [dinerCount, setDinerCount] = useState<number>(3);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(["m1", "m3"]);
  const [copiedInvite, setCopiedInvite] = useState<boolean>(false);

  const cartTotal = tableCart.reduce((sum, c) => sum + c.item.priceNum * c.count, 0);

  const handleAddToCart = (item: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const existing = tableCart.find((c) => c.item.id === item.id);
    if (existing) {
      setTableCart(
        tableCart.map((c) =>
          c.item.id === item.id ? { ...c, count: c.count + 1 } : c
        )
      );
    } else {
      setTableCart([...tableCart, { item, count: 1 }]);
    }
  };

  const handleSendOrder = () => {
    setOrderSent(true);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText("Botanica2026");
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  const handleConnectWifi = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setWifiConnected(true);
    }, 1100);
  };

  const toggleFeedbackTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleItemSelection = (id: string) => {
    if (selectedItemIds.includes(id)) {
      setSelectedItemIds(selectedItemIds.filter((item) => item !== id));
    } else {
      setSelectedItemIds([...selectedItemIds, id]);
    }
  };

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText("https://hitables.app/table/04/split");
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2200);
  };

  const filteredMenuItems = SAMPLE_MENU_ITEMS.filter((item) => {
    const matchesCategory = menuFilter === "all" || item.category === menuFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="touchpoints"
      className="py-24 px-6 bg-[#F9F7F0] text-[#1F2421] relative border-t border-[#DCD6CB]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-[#0A3420] text-xs font-semibold tracking-[0.2em] uppercase">
            Complete Guest Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-normal text-[#1F2421] tracking-tight">
            Five core capabilities.{" "}
            <span style={{ fontFamily: "Georgia, serif" }} className="italic text-[#0A3420]">
              Zero app downloads.
            </span>
          </h2>
          <p className="text-[#525B55] text-base md:text-lg font-normal leading-relaxed">
            Experience what guests see directly on their mobile browser the instant they tap or scan the table token. Test all five active capabilities below.
          </p>
        </div>

        {/* Outer Split Layout: Interactive Selectors & Phone Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Capability Selectors with In-Place Hover & Tap Effects */}
          <div className="lg:col-span-5 space-y-3">
            {[
              {
                id: "menu",
                title: "1. Order from Table",
                subtitle: "Zero Cashier Queue",
                desc: "Guests add specialty coffee & food directly from the table and send to the kitchen with zero line-waiting.",
                icon: <Utensils className="w-4 h-4" />,
              },
              {
                id: "wifi",
                title: "2. Guest Wi-Fi",
                subtitle: "One-Tap Connection",
                desc: "No staff interruptions or written chalkboard passwords. Instant network credentials at every table.",
                icon: <Wifi className="w-4 h-4" />,
              },
              {
                id: "feedback",
                title: "3. Table Feedback",
                subtitle: "Direct Service Rating",
                desc: "Private 5-star rating with sentiment tags to capture guest compliments and service impressions.",
                icon: <ThumbsUp className="w-4 h-4" />,
              },
              {
                id: "reserve",
                title: "4. Reserve a Table",
                subtitle: "Pre-Visit Booking",
                desc: "Choose date, time slot, and party size before arriving with immediate table held confirmation.",
                icon: <CalendarDays className="w-4 h-4" />,
              },
              {
                id: "split",
                title: "5. Split the Bill",
                subtitle: "Collaborative Check",
                desc: "Divide the check evenly, by ordered items, or custom amounts, and send instant companion invite links.",
                icon: <Receipt className="w-4 h-4" />,
              },
            ].map((feature) => (
              <div
                key={feature.id}
                onClick={() => setActiveTab(feature.id as any)}
                className={`p-5 rounded-2xl transition-all cursor-pointer border relative overflow-hidden group ${
                  activeTab === feature.id
                    ? "bg-white border-[#0A3420] shadow-md scale-[1.01]"
                    : "bg-[#F3F0E8] border-[#DCD6CB] hover:bg-white hover:border-[#0A3420]/40"
                }`}
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                      activeTab === feature.id
                        ? "bg-[#0A3420] text-white"
                        : "bg-[#EAE5DC] text-[#1F2421] group-hover:bg-[#0A3420] group-hover:text-white"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-[#1F2421]">{feature.title}</h3>
                    <span className="text-[11px] text-[#0A3420] font-mono">{feature.subtitle}</span>
                  </div>
                </div>
                <p className="text-xs text-[#525B55] leading-relaxed pl-12">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Live Mobile Smartphone Simulator */}
          <div className="lg:col-span-7 flex justify-center sticky top-24">
            <div className="w-[340px] sm:w-[380px] h-[690px] bg-[#2C332E] rounded-[48px] p-3.5 shadow-2xl border-4 border-[#3D4741] relative flex flex-col overflow-hidden">
              {/* Dynamic Island Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#18261E] mr-3" />
                <div className="w-2 h-2 rounded-full bg-emerald-950" />
              </div>

              {/* Status Bar */}
              <div className="pt-2 px-6 pb-2 flex items-center justify-between text-[11px] text-white/80 font-mono z-30 select-none">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Phone Content Screen */}
              <div className="flex-1 bg-[#F9F7F0] text-[#1F2421] rounded-[36px] overflow-hidden flex flex-col relative">
                {/* Mobile Header Bar */}
                <div className="px-4 py-2.5 bg-white border-b border-[#DCD6CB] flex items-center justify-between shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-[#0A3420] text-white flex items-center justify-center text-[10px] font-bold">
                      H
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0A3420] leading-none">
                        Cafe Botanica
                      </h4>
                      <span className="text-[10px] text-gray-500">Table 04 · Hi Tables!</span>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-[#EAE5DC] text-[10px] font-medium text-[#0A3420]">
                    Table Connected
                  </div>
                </div>

                {/* 5-Tab Navigation Bar */}
                <div className="flex items-center justify-between border-b border-[#DCD6CB] bg-white/90 px-1.5 py-1.5 text-[11px] font-medium overflow-x-auto gap-1">
                  {[
                    { id: "menu", label: "Order", icon: <Utensils className="w-3 h-3" /> },
                    { id: "wifi", label: "Wi-Fi", icon: <Wifi className="w-3 h-3" /> },
                    { id: "feedback", label: "Review", icon: <ThumbsUp className="w-3 h-3" /> },
                    { id: "reserve", label: "Reserve", icon: <CalendarDays className="w-3 h-3" /> },
                    { id: "split", label: "Split", icon: <Receipt className="w-3 h-3" /> },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-colors cursor-pointer shrink-0 ${
                        activeTab === tab.id
                          ? "bg-[#0A3420] text-white shadow-2xs"
                          : "text-[#525B55] hover:text-[#1F2421]"
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Main Scrollable View Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-20">
                  {/* TAB 1: TABLE ORDERING (ZERO QUEUING) */}
                  {activeTab === "menu" && (
                    <div className="space-y-3 animate-fade-in">
                      {orderSent ? (
                        <div className="bg-white p-5 rounded-2xl border border-[#0A3420] shadow-sm text-center space-y-3 animate-fade-in">
                          <div className="w-12 h-12 rounded-full bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-7 h-7" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-[#1F2421]">
                              Order Sent to Barista & Kitchen!
                            </h4>
                            <p className="text-xs text-[#0A3420] font-semibold">
                              Table 04 · Estimated 6–8 mins
                            </p>
                            <p className="text-[11px] text-[#525B55]">
                              Zero queuing at cashier. Your coffee and dishes are being freshly prepared now.
                            </p>
                          </div>
                          <div className="p-2.5 bg-[#F3F0E8] rounded-xl text-left text-[11px] space-y-1">
                            {tableCart.map((c) => (
                              <div key={c.item.id} className="flex justify-between text-[#1F2421]">
                                <span>{c.count}x {c.item.name}</span>
                                <span className="font-mono font-bold">${(c.item.priceNum * c.count).toFixed(2)}</span>
                              </div>
                            ))}
                            <div className="border-t border-[#DCD6CB] pt-1 flex justify-between font-bold text-xs text-[#0A3420]">
                              <span>Total:</span>
                              <span>${cartTotal.toFixed(2)}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setOrderSent(false);
                              setTableCart([]);
                            }}
                            className="text-xs text-[#0A3420] font-medium underline cursor-pointer"
                          >
                            Add more items to Table 04
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search coffee, brunch, bakery..."
                              className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#DCD6CB] rounded-lg text-xs text-[#1F2421] placeholder-gray-400 focus:outline-[#0A3420]"
                            />
                          </div>

                          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                            {["all", "coffee", "bakery", "beverage"].map((cat) => (
                              <button
                                key={cat}
                                onClick={() => setMenuFilter(cat as any)}
                                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer shrink-0 capitalize ${
                                  menuFilter === cat
                                    ? "bg-[#0A3420] text-white font-medium"
                                    : "bg-white border border-[#DCD6CB] text-[#525B55] hover:bg-[#EAE5DC]"
                                }`}
                              >
                                {cat === "all" ? "All Items" : cat}
                              </button>
                            ))}
                          </div>

                          <div className="space-y-2">
                            {filteredMenuItems.map((item) => (
                              <div
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                className="bg-white p-2.5 rounded-xl border border-[#DCD6CB] shadow-2xs hover:border-[#0A3420] transition-all cursor-pointer flex gap-3 items-center"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  referrerPolicy="no-referrer"
                                  className="w-14 h-14 rounded-lg object-cover bg-gray-100 shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-semibold text-xs text-[#1F2421] truncate">
                                      {item.name}
                                    </h5>
                                    <span className="text-xs font-bold text-[#0A3420] tabular-nums">
                                      {item.price}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-[#525B55] line-clamp-2 mt-0.5">
                                    {item.description}
                                  </p>
                                  <div className="flex items-center justify-between mt-1">
                                    <span className="text-[9px] text-[#0A3420] font-medium">{item.tags[0]}</span>
                                    <button
                                      onClick={(e) => handleAddToCart(item, e)}
                                      className="px-2 py-0.5 rounded-md bg-[#0A3420] hover:bg-[#1B4D36] text-white text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                                    >
                                      <Plus className="w-3 h-3" />
                                      <span>Add to Order</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* TAB 2: GUEST WI-FI */}
                  {activeTab === "wifi" && (
                    <div className="space-y-4 animate-fade-in pt-1">
                      <div className="bg-white p-5 rounded-2xl border border-[#DCD6CB] shadow-xs text-center space-y-3">
                        <div className="w-11 h-11 rounded-full bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center mx-auto">
                          <Wifi className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#1F2421]">
                            Cafe Botanica Guest Wi-Fi
                          </h4>
                          <p className="text-xs text-[#525B55]">High-Speed Guest Fiber Network</p>
                        </div>

                        <div className="bg-[#F3F0E8] p-3 rounded-xl space-y-1.5 text-left text-xs">
                          <div className="flex justify-between items-center text-[#525B55]">
                            <span>Network SSID:</span>
                            <span className="font-mono font-semibold text-[#1F2421]">
                              Botanica_Guest_5G
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-[#525B55]">
                            <span>Password:</span>
                            <span className="font-mono font-semibold text-[#1F2421]">
                              Botanica2026
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 pt-1">
                          <button
                            onClick={handleConnectWifi}
                            disabled={wifiConnected || isConnecting}
                            className={`w-full py-2.5 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                              wifiConnected
                                ? "bg-[#EAE5DC] text-[#0A3420] border border-[#DCD6CB]"
                                : "bg-[#0A3420] text-white hover:bg-[#1B4D36]"
                            }`}
                          >
                            {isConnecting ? (
                              <span>Authenticating...</span>
                            ) : wifiConnected ? (
                              <>
                                <Check className="w-4 h-4 text-[#0A3420]" />
                                <span>Connected to Guest Wi-Fi</span>
                              </>
                            ) : (
                              <>
                                <Wifi className="w-4 h-4" />
                                <span>Simulate One-Tap Connect</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={handleCopyPassword}
                            className="w-full py-2 rounded-xl text-xs font-medium text-[#1F2421] bg-white border border-[#DCD6CB] hover:bg-[#F3F0E8] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {copiedWifi ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-[#0A3420]" />
                                <span>Password Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Wi-Fi Password</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: GUEST FEEDBACK */}
                  {activeTab === "feedback" && (
                    <div className="space-y-3 animate-fade-in pt-1">
                      {!feedbackSubmitted ? (
                        <div className="space-y-3">
                          <div className="bg-white p-4 rounded-2xl border border-[#DCD6CB] shadow-2xs space-y-2.5 text-center">
                            <h4 className="font-semibold text-xs text-[#1F2421]">
                              How was your visit at Table 04?
                            </h4>
                            <div className="flex items-center justify-center gap-1.5 py-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setRating(star)}
                                  onMouseEnter={() => setHoverRating(star)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                                >
                                  <Star
                                    className={`w-6 h-6 ${
                                      (hoverRating || rating) >= star
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                            <span className="text-[11px] font-medium text-[#0A3420]">
                              {rating === 5 && "Exceptional experience"}
                              {rating === 4 && "Great visit"}
                              {rating === 3 && "Good, room for improvement"}
                              {rating <= 2 && "We want to make this right"}
                            </span>
                          </div>

                          <div className="bg-white p-3 rounded-2xl border border-[#DCD6CB] shadow-2xs space-y-2">
                            <label className="text-[10px] font-medium text-[#525B55] uppercase block">
                              What stood out? (Tap tags)
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {["Coffee Quality", "Cozy Ambiance", "Staff Courtesy", "Music Volume"].map(
                                (tag) => (
                                  <button
                                    type="button"
                                    key={tag}
                                    onClick={() => toggleFeedbackTag(tag)}
                                    className={`px-2 py-1 rounded-full text-[10px] transition-all cursor-pointer ${
                                      selectedTags.includes(tag)
                                        ? "bg-[#0A3420] text-white"
                                        : "bg-[#F3F0E8] text-[#525B55] hover:bg-[#EAE5DC]"
                                    }`}
                                  >
                                    {tag}
                                  </button>
                                )
                              )}
                            </div>
                          </div>

                          <button
                            onClick={() => setFeedbackSubmitted(true)}
                            className="w-full py-2.5 rounded-xl bg-[#0A3420] text-white text-xs font-medium hover:bg-[#1B4D36] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Table Feedback</span>
                          </button>
                        </div>
                      ) : (
                        <div className="bg-white p-5 rounded-2xl border border-[#DCD6CB] text-center space-y-2.5 animate-fade-in">
                          <div className="w-10 h-10 rounded-full bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center mx-auto">
                            <Check className="w-5 h-5" />
                          </div>
                          <h4 className="font-bold text-xs text-[#1F2421]">Thank you for your feedback!</h4>
                          <p className="text-[11px] text-[#525B55]">
                            Your thoughts help our baristas and kitchen team maintain excellence.
                          </p>
                          <button
                            onClick={() => setFeedbackSubmitted(false)}
                            className="text-xs text-[#0A3420] underline font-medium cursor-pointer"
                          >
                            Submit another rating
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: RESERVE A TABLE */}
                  {activeTab === "reserve" && (
                    <div className="space-y-3 animate-fade-in pt-1">
                      {!reservationHeld ? (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setReservationHeld(true);
                          }}
                          className="space-y-3"
                        >
                          <div className="bg-white p-4 rounded-2xl border border-[#DCD6CB] shadow-2xs space-y-3">
                            <div className="border-b border-[#DCD6CB] pb-2">
                              <h4 className="font-bold text-xs text-[#1F2421]">
                                Reserve Table at Cafe Botanica
                              </h4>
                              <p className="text-[10px] text-[#525B55]">Book ahead before visiting</p>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-medium text-[#525B55] block">
                                Choose Date & Time
                              </label>
                              <div className="grid grid-cols-2 gap-1.5">
                                {["Tonight, 7:00 PM", "Tonight, 8:30 PM", "Tomorrow, 11:30 AM", "Tomorrow, 6:00 PM"].map(
                                  (slot) => (
                                    <button
                                      type="button"
                                      key={slot}
                                      onClick={() => setReserveDate(slot)}
                                      className={`p-1.5 rounded-lg text-[10px] font-medium border text-left transition-all cursor-pointer ${
                                        reserveDate === slot
                                          ? "bg-[#0A3420] text-white border-[#0A3420]"
                                          : "bg-[#F9F7F0] text-[#1F2421] border-[#DCD6CB] hover:bg-white"
                                      }`}
                                    >
                                      {slot}
                                    </button>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <label className="text-[10px] font-medium text-[#525B55]">Party Size</label>
                                <span className="font-bold text-xs text-[#0A3420]">{partySize} Guests</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 6, 8].map((num) => (
                                  <button
                                    type="button"
                                    key={num}
                                    onClick={() => setPartySize(num)}
                                    className={`flex-1 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                      partySize === num
                                        ? "bg-[#0A3420] text-white border-[#0A3420]"
                                        : "bg-[#F9F7F0] text-[#1F2421] border-[#DCD6CB] hover:bg-white"
                                    }`}
                                  >
                                    {num}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-medium text-[#525B55] block">
                                Seating Preference
                              </label>
                              <select
                                value={seatingArea}
                                onChange={(e) => setSeatingArea(e.target.value)}
                                className="w-full text-xs p-2 bg-[#F9F7F0] border border-[#DCD6CB] rounded-lg text-[#1F2421] focus:outline-[#0A3420] cursor-pointer"
                              >
                                <option value="Main Dining Hall">Main Dining Hall (Oak Tables)</option>
                                <option value="Sunlit Patio">Sunlit Outdoor Garden Patio</option>
                                <option value="Bar High-Tops">Espresso Bar High-Tops</option>
                              </select>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-medium text-[#525B55] block">
                                Reservation Name
                              </label>
                              <input
                                type="text"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                placeholder="Your name"
                                className="w-full text-xs p-2 bg-[#F9F7F0] border border-[#DCD6CB] rounded-lg text-[#1F2421] focus:outline-[#0A3420]"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-[#0A3420] text-white text-xs font-semibold hover:bg-[#1B4D36] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <CalendarDays className="w-3.5 h-3.5" />
                            <span>Hold Table at Cafe Botanica</span>
                          </button>
                        </form>
                      ) : (
                        <div className="bg-white p-5 rounded-2xl border border-[#DCD6CB] text-center space-y-3 animate-fade-in">
                          <div className="w-11 h-11 rounded-full bg-[#EAE5DC] text-[#0A3420] flex items-center justify-center mx-auto">
                            <Check className="w-6 h-6" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-[#1F2421]">
                              Table Confirmed for {guestName}!
                            </h4>
                            <p className="text-xs text-[#0A3420] font-semibold">
                              {partySize} Guests · {reserveDate}
                            </p>
                            <p className="text-[10px] text-[#525B55]">
                              {seatingArea} · Table will be held ready for your arrival.
                            </p>
                          </div>
                          <button
                            onClick={() => setReservationHeld(false)}
                            className="text-xs text-[#0A3420] underline font-medium cursor-pointer"
                          >
                            Modify reservation
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 5: SPLIT THE BILL */}
                  {activeTab === "split" && (
                    <div className="space-y-3 animate-fade-in pt-1">
                      <div className="bg-white p-4 rounded-2xl border border-[#DCD6CB] shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-[#DCD6CB] pb-2">
                          <div>
                            <span className="text-[10px] text-[#525B55]">Table 04 Active Total:</span>
                            <h4 className="font-bold text-lg text-[#1F2421] tabular-nums">
                              $51.30
                            </h4>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EAE5DC] text-[#0A3420]">
                            Active Table Tab
                          </span>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-medium text-[#525B55] block">
                            Choose How to Split
                          </label>
                          <div className="grid grid-cols-3 gap-1">
                            {[
                              { id: "even", label: "Split Evenly" },
                              { id: "items", label: "By Items" },
                              { id: "custom", label: "Custom" },
                            ].map((m) => (
                              <button
                                key={m.id}
                                type="button"
                                onClick={() => setSplitMethod(m.id as any)}
                                className={`py-1.5 px-1 rounded-lg text-[10px] font-medium border text-center transition-all cursor-pointer ${
                                  splitMethod === m.id
                                    ? "bg-[#0A3420] text-white border-[#0A3420]"
                                    : "bg-[#F9F7F0] text-[#1F2421] border-[#DCD6CB] hover:bg-white"
                                }`}
                              >
                                {m.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {splitMethod === "even" && (
                          <div className="p-3 bg-[#F3F0E8] rounded-xl space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#525B55]">Number of Diners:</span>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setDinerCount(Math.max(2, dinerCount - 1))}
                                  className="w-6 h-6 rounded bg-white border border-[#DCD6CB] flex items-center justify-center text-xs font-bold"
                                >
                                  -
                                </button>
                                <span className="font-bold text-[#1F2421] font-mono">{dinerCount}</span>
                                <button
                                  type="button"
                                  onClick={() => setDinerCount(Math.min(8, dinerCount + 1))}
                                  className="w-6 h-6 rounded bg-white border border-[#DCD6CB] flex items-center justify-center text-xs font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-1 border-t border-[#DCD6CB]/60">
                              <span className="text-xs font-semibold text-[#1F2421]">Your Share:</span>
                              <span className="text-base font-bold text-[#0A3420] tabular-nums">
                                ${(51.3 / dinerCount).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        )}

                        {splitMethod === "items" && (
                          <div className="p-2.5 bg-[#F3F0E8] rounded-xl space-y-1.5">
                            <span className="text-[10px] font-medium text-[#525B55] block">
                              Select what you ordered at Table 04:
                            </span>
                            <div className="space-y-1 max-h-32 overflow-y-auto">
                              {SAMPLE_MENU_ITEMS.map((item) => (
                                <div
                                  key={item.id}
                                  onClick={() => toggleItemSelection(item.id)}
                                  className={`p-1.5 rounded-lg border text-[11px] flex items-center justify-between cursor-pointer transition-colors ${
                                    selectedItemIds.includes(item.id)
                                      ? "bg-white border-[#0A3420] text-[#0A3420] font-semibold"
                                      : "bg-[#F9F7F0] border-[#DCD6CB] text-[#525B55]"
                                  }`}
                                >
                                  <div className="flex items-center gap-1.5 truncate pr-2">
                                    <div
                                      className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] border ${
                                        selectedItemIds.includes(item.id)
                                          ? "bg-[#0A3420] text-white border-[#0A3420]"
                                          : "border-gray-400"
                                      }`}
                                    >
                                      {selectedItemIds.includes(item.id) && "✓"}
                                    </div>
                                    <span className="truncate">{item.name}</span>
                                  </div>
                                  <span className="tabular-nums font-mono">{item.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {splitMethod === "custom" && (
                          <div className="p-3 bg-[#F3F0E8] rounded-xl space-y-2">
                            <span className="text-[10px] font-medium text-[#525B55] block">
                              Enter custom contribution:
                            </span>
                            <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-[#DCD6CB]">
                              <span className="text-xs font-bold text-[#1F2421]">$</span>
                              <input
                                type="number"
                                defaultValue="20.00"
                                className="w-full text-xs font-mono font-bold text-[#1F2421] focus:outline-none"
                              />
                            </div>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={handleCopyInviteLink}
                          className="w-full py-2.5 rounded-xl bg-white border border-[#0A3420] text-[#0A3420] hover:bg-[#F3F0E8] text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          {copiedInvite ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#0A3420]" />
                              <span>Invite Link Copied!</span>
                            </>
                          ) : (
                            <>
                              <Link className="w-3.5 h-3.5" />
                              <span>Send Invite Link to Tablemates</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Floating Bottom Cart Bar (When ordering on Table) */}
                {activeTab === "menu" && tableCart.length > 0 && !orderSent && (
                  <div className="absolute bottom-3 inset-x-3 bg-[#0A3420] text-white p-3 rounded-2xl shadow-xl flex items-center justify-between z-30 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#1B4D36] flex items-center justify-center text-xs font-bold">
                        {tableCart.reduce((sum, c) => sum + c.count, 0)}
                      </div>
                      <div>
                        <span className="text-[10px] text-white/70 block">Table 04 Order:</span>
                        <span className="text-xs font-bold font-mono">${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleSendOrder}
                      className="px-3.5 py-1.5 rounded-xl bg-white text-[#0A3420] text-xs font-bold hover:bg-emerald-50 transition-colors cursor-pointer shadow-xs flex items-center gap-1"
                    >
                      <span>Send to Bar</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* Bottom Home Indicator */}
                <div className="py-1.5 flex justify-center bg-white border-t border-[#DCD6CB]">
                  <div className="w-28 h-1 bg-[#DCD6CB] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-[#1F2421] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative border border-[#DCD6CB]"
            >
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-[#1F2421]">{selectedItem.name}</h3>
                    <p className="text-sm font-semibold text-[#0A3420] tabular-nums">
                      {selectedItem.price}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1.5 rounded-full bg-[#EAE5DC] text-[#525B55] hover:text-[#1F2421] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-[#525B55] leading-relaxed">
                  {selectedItem.description}
                </p>
                <div className="p-3 bg-[#F3F0E8] rounded-xl text-xs text-[#0A3420] font-medium">
                  {selectedItem.notes}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="flex-1 py-2.5 bg-[#0A3420] text-white font-medium text-xs rounded-xl hover:bg-[#1B4D36] cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Table Order</span>
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-4 py-2.5 bg-[#EAE5DC] text-[#1F2421] font-medium text-xs rounded-xl hover:bg-[#DCD6CB] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
