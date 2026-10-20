export const CREATIVE_DIRECTION_SUMMARY = `### Creative Direction: Warm Editorial Hospitality & Invisible Technology

**Brand Positioning**: Hi Tables! sits at the intersection of artisanal hospitality, industrial design, and contemporary web technology. It departs from cold dark dashboards and generic QR code tools with a tactile, paper-like natural aesthetic.

**Visual Tokens**:
- **Canvas**: Warm White (#f9f7f0 / #f3f0e8), creating an organic, paper-like background that feels softer and warmer than sterile white.
- **Brand Signature**: Muted Forest & Emerald Green (#0A3420 / #1B4D36), inspired by botanical cafe interiors, lush coffee plants, and the physical table token.
- **Stone Gray Surfaces**: Gentle separation (#eae5dc / #dcd6cb) for cards, device frames, and hairline dividers without harsh contrast.
- **Deep Charcoal Typography**: (#1f2421 / #525b55) keeping page reading comfortable, calm, and editorial.
- **Typography Pairing**: Clean Arial for sans-serif controls and readability, paired with Georgia for human editorial italic accents.
- **Framed Hero Video**: Framed cinematic showcase with stone borders, continuous crowd animation at an aesthetic coffee shop, and live table status indicators.`;

export const LOVABLE_MASTER_PROMPT = `# MASTER PROMPT: HI TABLES! LANDING PAGE & GUEST EXPERIENCE PLATFORM

Build a production-grade, highly sophisticated hospitality landing page and guest touchpoint experience for "Hi Tables!" using React, TypeScript, Tailwind CSS, Motion (framer-motion), and Lucide icons.

## BRAND CORE & PHILOSOPHY
- **Product Name**: Hi Tables!
- **Core Proposition**: "A better experience starts at the table."
- **Supporting Idea**: Simple interactions. Better hospitality.
- **Brand Identity**: Thoughtful, tactile, approachable, human-centered hospitality technology. Not a generic QR generator or cold SaaS dashboard.
- **5 Core Capabilities**:
  1. Digital Menu: Interactive food & beverage cards with tasting notes, dietary tags, and search.
  2. Guest Wi-Fi: Instant network SSID, one-tap password copy, and simulated connection handshake.
  3. Guest Feedback: Frictionless 5-star rating, sentiment tags, and private management note.
  4. Reserve a Table: Pre-visit booking selecting date, time slot, and party size with held confirmation (prototype).
  5. Split the Bill: Multi-diner group check splitting (Split Evenly, Split by Items Ordered, or Custom amount) with companion invite links (prototype).

---

## 1. VISUAL SYSTEM & PALETTE TOKENS
- **Soft Natural Palette**:
  * Warm White Canvas: \`#f9f7f0\` / \`#f3f0e8\` (soft paper-like texture)
  * Muted Green Signature: \`#0A3420\` (hover: \`#1B4D36\`)
  * Stone Gray Surfaces & Borders: \`#eae5dc\` / \`#dcd6cb\`
  * Deep Charcoal Typography: \`#1f2421\` (muted body: \`#525b55\`)
  * Brushed Silver Foil Accents: \`#CBD5E1\` on physical sticker
- **Typography**:
  * Primary Sans-Serif: \`Arial\` (Helvetica, ui-sans-serif, system-ui)
  * Editorial Accents: \`Georgia\` (regular & italic for emphasized phrases)
- **Zero-Pill & Anti-Slop Discipline**:
  * Unboxed metadata using typographic bullets (\`·\`).
  * Hairline stone borders, generous padding, narrow readable content widths.
  * No generic purple gradients, no floating vanity pills, no decorative pulsing dots.

---

## 2. FRAMED CINEMATIC HERO
- **Framed Video Showcase**:
  * Framed inside a rounded-3xl container with stone border (\`#dcd6cb\`) and subtle shadow.
  * Continuous video stream of an aesthetic coffee shop crowd enjoying coffee and conversation.
  * Fallback poster featuring high-resolution bustling cafe crowd with continuous smooth Ken Burns drift animation.
  * Live status indicator: "Table 04 · Cafe Botanica · Hi Tables! Connected".
- **Hero Typography & Typewriter CTA**:
  * Editorial headline: "A better experience starts at the table." in Arial + Georgia italic.
  * Interactive CTA toggling between "Get early access" and an inline email form with typewriter placeholder.
  * Secondary button: "Simulate Table Experience" smoothly scrolling to the interactive smartphone showcase.

---

## 3. SECTION A: THE PHYSICAL TOKEN
- Authentic vector rendering of the deep emerald green (\`#0A3420\`) table sticker:
  * Silver QR code matrix, embedded NTAG213 NFC indicator, and hand-drawn corner botanical leaf veins.
  * Working "Simulate NFC Tap" and "Simulate QR Scan" triggers.
  * Physical specs: waterproof vinyl, alcohol-resistant, zero battery maintenance.

---

## 4. SECTION B: 5-TAB INTERACTIVE MOBILE SIMULATOR
A simulated smartphone containing 5 working guest flows:
1. **Digital Menu**: Category filtering (Specialty Coffee, Artisan Bakery, Refreshers), item detail modal, dietary tags.
2. **Guest Wi-Fi**: SSID Botanica_Guest_5G, one-click copy password, auto-join simulation.
3. **Guest Feedback**: 5-star rating, quick tags, short review note, instant gratitude confirmation.
4. **Reserve a Table**: Date/time slot buttons, party size selector (1–8 guests), seating area selection, and held-table confirmation card.
5. **Split the Bill**: Table total calculation, 3 split methods (Evenly among diners, By individual items ordered, Custom share), and one-click "Copy Companion Invite Link".

---

## 5. SECTIONS C–F: THE STORY, BENEFITS & CONVERSION
- **Dedicated Feature Spotlights**: Detailed interactive cards for Table Reservations and Collaborative Bill Splitting.
- **How It Works**: 3 natural steps (Affix to table → Tap or scan → Enjoy full table session).
- **Venue Benefits**: 6 credible hospitality operational benefits.
- **Early Access Partner Form**: B2B inquiry capturing venue name, category, and table count.
- **Quiet Footer**: Wordmark, navigation mirror, and prototype disclaimer.`;

export const EXTERNAL_ASSETS_CHECKLIST = [
  {
    name: "Continuous-Shot Hero Video (Mux HLS)",
    type: "HLS Video Stream (.m3u8)",
    url: "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8",
    description: "Continuous shot starting on phone scanning emerald token on wooden table, pulling back to wide cafe scene.",
    status: "Active (Mux Stream)",
  },
  {
    name: "Aesthetic Coffee Shop Crowd Poster",
    type: "High-Resolution Photography (16:9)",
    url: "/src/assets/images/coffee_shop_crowd_hero_1791947763368.jpg",
    description: "Sunlit aesthetic cafe with bustling crowd enjoying coffee at oak tables, providing zero-black-screen fallback with drift animation.",
    status: "Integrated & Active",
  },
  {
    name: "Physical Sticker Artwork (SVG / Vector)",
    type: "Vector Graphic",
    url: "Rendered in StickerShowcase.tsx",
    description: "Official Hi Tables! table sticker layout with silver QR, NFC wave, and botanical leaf veins.",
    status: "Vector rendered",
  },
  {
    name: "Menu Imagery (High-Res Food & Beverage)",
    type: "Culinary Photography",
    url: "Curated coffee, bakery, and brunch imagery",
    description: "Authentic specialty coffee latte art, sourdough tartines, and French pastries.",
    status: "Integrated",
  },
];

export const IMPLEMENTATION_SEQUENCE = [
  {
    phase: "Phase 1: Warm Paper Palette & Framed Cinematic Hero",
    tasks: [
      "Set background to warm white #f9f7f0 / #f3f0e8 with deep charcoal text #1f2421",
      "Mount framed BackgroundVideo showcase with stone borders and crowd animation",
      "Build floating stone-glass navbar with brand wordmark and responsive links",
      "Render headline in Arial with Georgia italic accents and typewriter CTA",
    ],
  },
  {
    phase: "Phase 2: The Physical Sticker Showcase",
    tasks: [
      "Render vector-faithful Hi Tables! emerald green & silver table sticker",
      "Add interactive 'NFC Tap' and 'QR Scan' triggers",
      "Display physical material specifications on stone paper cards",
    ],
  },
  {
    phase: "Phase 3: 5-Tab Interactive Smartphone Simulator",
    tasks: [
      "Construct realistic phone viewport with status bar and notch",
      "Implement Digital Menu tab with search and category filters",
      "Implement Guest Wi-Fi tab with SSID and password copy",
      "Implement Guest Feedback tab with 5-star rating and tags",
      "Implement Reserve a Table tab with date, time, and party size",
      "Implement Split the Bill tab with Even/Items/Custom split methods and invite link",
    ],
  },
  {
    phase: "Phase 4: Dedicated Feature Spotlights & Partner Waitlist",
    tasks: [
      "Build side-by-side interactive feature cards for Reservations and Bill Splitting",
      "Create clean 3-step timeline and 6 operator benefits",
      "Build early-access waitlist form with validation and confirmation card",
      "Construct clean footer with honest product boundary disclosure",
    ],
  },
  {
    phase: "Phase 5: Lovable Prompt Studio Drawer & Verification",
    tasks: [
      "Update prompt drawer with all 5 capabilities and warm paper palette tokens",
      "Verify TypeScript compilation and WCAG AA color contrast",
    ],
  },
];
