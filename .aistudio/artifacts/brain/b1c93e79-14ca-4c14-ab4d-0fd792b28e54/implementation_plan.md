# Hi Tables! — Full-Screen Video Hero, Shimmering Physical Sticker & Frictionless Table Ordering

A complete evolution of **Hi Tables!**, returning the hero section to an immersive full-screen edge-to-edge continuous video experience with a warm paper tint and overlaid editorial typography, updating the physical table sticker to exactly match the uploaded design (Order, Wi-Fi, Leave Feedback) with interactive metallic shine animations upon hover/tap, adding table ordering with zero cashier queuing, removing all prototype disclaimers, and introducing interactive in-place card expansions with animated demonstrations across all feature sections.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were confirmed during clarification:
> - **Full-Screen Edge-to-Edge Hero**: The cinematic video of people moving, chatting, and drinking coffee at an aesthetic cafe fills the entire 100svh viewport edge-to-edge. Layered directly over it is a warm paper tint scrim, the floating navbar, oversized editorial typography (*"A better experience starts at the table."*), and the typewriter email CTA.
> - **Exact Physical Sticker Design**: Strictly limited to the authentic three touchpoints shown in the uploaded photo:
>   - **ORDER** (Fork & Plate icon)
>   - **Wi-Fi** (Signal Wave icon)
>   - **LEAVE FEEDBACK** (Thumbs-Up icon)
>   - Central Silver QR code, *“Tap or Scan to Order”*, *“— ))) NFC —”*, and corner botanical leaf motifs.
> - **Metallic Foil Shine Animation**: Hovering or tapping the physical sticker triggers a dramatic, realistic silver foil light sweep and 3D surface gleam across the emerald card.
> - **Zero-Queue Table Ordering**: Promoted as a primary hospitality superpower—guests order food and specialty coffee straight from their table phone session without waiting in cashier lines or crowding bar counters.
> - **In-Place Card Expansion & Effects**: Tapping any feature box, benefit card, or capability column smoothly expands the card in place with live demonstrations, visual stats, and interactive simulations.
> - **Removal of Prototype Disclaimers**: All intrusive disclaimers, "prototype" tags, and limitation notices are completely removed, presenting Hi Tables! as a polished, production-grade hospitality solution.

---

## 1. Information Architecture & Key Flows

```
┌────────────────────────────────────────────────────────────────────────┐
│ Full-Screen Edge-to-Edge Hero (100svh):                                │
│ Continuous Moving Coffee Shop Crowd Video · Warm Paper Scrim Tint ·   │
│ Editorial Typography Overlay · Floating Nav · Typewriter Email CTA     │
├────────────────────────────────────────────────────────────────────────┤
│ Section A: The Authentic Table Token:                                  │
│ Exact Vector Artwork (Order · Wi-Fi · Feedback) · Interactive 3D Tilt │
│ Dynamic Metallic Silver Foil Shine & Holographic Light Sweep           │
├────────────────────────────────────────────────────────────────────────┤
│ Section B: Interactive 5-Capability Mobile Table Experience:           │
│ 1. Table Ordering (Zero Cashier Queuing · Instant Cart · Send to Bar) │
│ 2. Guest Wi-Fi (One-Tap Connect · Password Copy)                       │
│ 3. Table Feedback (5-Star Rating · Team Compliments)                   │
│ 4. Table Reservations (Date · Time · Party Size · Instant Hold)        │
│ 5. Split the Bill (Split Evenly · By Items · Companion Invite Link)    │
├────────────────────────────────────────────────────────────────────────┤
│ Section C: Expandable Feature Columns & Interactive Demonstrations:    │
│ Tap Any Column to Expand in Place with Live Animated Previews          │
├────────────────────────────────────────────────────────────────────────┤
│ Section D: Core Hospitality Superpowers (No Queues, Agile Menus):      │
│ In-place Expansion with Operational Hospitality Metrics                │
├────────────────────────────────────────────────────────────────────────┤
│ Section E & F: B2B Early Access Partner Registration & Footer          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Visual Identity, Motion & Shader Effects

- **Warm Paper Scrim & Atmosphere**:
  - Full-screen moving video runs edge-to-edge (`absolute inset-0 w-full h-full object-cover`).
  - Warm paper tint scrim (`bg-gradient-to-b from-[#1F2421]/60 via-[#F9F7F0]/25 to-[#F9F7F0]` or warm amber-toned overlay) balancing video motion legibility with editorial warm white text.
- **Physical Sticker Metallic Foil Shimmer**:
  - A diagonal specular reflection sweep (`background: linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.45) 55%, transparent 80%)`).
  - Animated on hover and on click with `@keyframes metallicShine`.
  - Realistic 3D tilt tracking cursor position on desktop and touch tap on mobile.
- **In-Place Card Expansion System**:
  - Every feature card in Sections C and D features an active expansion state using `motion.div layout`.
  - Tapping a card expands it with secondary operational insights, live interactive calculators, and visual animations.

---

## 3. Interactive Touchpoints & Table Ordering System

### 1. Table Ordering (Zero Queues at Cashier)
- Guests browse the visual menu and tap *"Add to Table Order"*.
- Floating Table Cart Bar shows item count and running total.
- One-tap *"Send Order to Kitchen & Bar"* with animated order ticket confirmation showing:
  - Table 04
  - Estimated preparation time (e.g., 6–8 mins)
  - Zero queuing at the counter.

### 2. Guest Wi-Fi & Table Feedback
- High-speed fiber network credentials with one-click password copy and simulated connection handshake.
- 5-star rating with quick sentiment tags and private management note.

### 3. Table Reservations & Collaborative Bill Splitting
- Pre-visit reservation flow with party size and seating zone.
- Bill splitting with Evenly, Itemized, and Custom options with one-click companion invite link copy.

---

## 4. Verification Plan

1. **Full-Screen Video Hero Verification**:
   - Verify continuous video loop playback edge-to-edge with overlaid typography and warm paper tint.
2. **Sticker Artwork & Shine Verification**:
   - Verify sticker artwork contains only ORDER, Wi-Fi, and LEAVE FEEDBACK.
   - Verify metallic foil shine animation triggers on hover and click.
3. **Table Ordering & In-Place Expansion**:
   - Test adding items to table order and sending order without cashier queues.
   - Test expanding cards in place across the feature grid.
4. **Build & Lint Verification**:
   - Run `compile_applet` and `lint_applet` to confirm zero errors.
