# Design Guidelines: Visura AI

## 🎨 Philosophy
**"Mystic Clarity"**. Мы сочетаем глубокую тайну (темный фон, туман) с ясностью видения (светящийся янтарь, четкая типографика). Название Visura (от лат. "Vision") диктует фокус на визуальном восприятии.

## 🛠 Tech Implementation Specs (Strict)
*   **Icons:** Use `lucide-react`.
    *   **CRITICAL:** Set `strokeWidth={1.5}` (or `1`) for ALL icons. We need a thin, elegant, premium look. Heavy icons are forbidden.
*   **Fonts:** Use Google Fonts via `next/font` or standard import.
*   **Styling:** Tailwind CSS.

## 🌈 Color Palette (Dark Mode Only)

### Backgrounds (The Void)
*   **Global Background:** Do NOT use flat black. Use this specific Tailwind gradient to simulate the "Ethereal Amber" fog:
    *   `bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-gray-900 to-black`
*   **Surface (Cards):** `#121212` with transparency (Glassmorphism).

### Accents
*   **Ethereal Amber (Primary):** `#FFBF00`
    *   Use for: Call-to-Action buttons, active states, key icons.
    *   *Glow Effect:* `shadow-[0_0_15px_rgba(255,191,0,0.3)]`.
*   **Mystic Fog (Secondary):** `#2A2A2A` (Borders, separators).

### Text
*   **Primary:** `#F5F5F5` (Off-white, not pure white).
*   **Muted:** `#A1A1AA` (For placeholders and secondary text).

## 🖋 Typography
*   **Headings (H1, H2, H3):** `Playfair Display` (Serif).
    *   *Weight:* 600 (Semi-Bold).
    *   *Style:* Add `tracking-wide` for a cinematic feel.
*   **Body Text:** `Inter` or `Manrope` (Sans-serif).
    *   *Weight:* 300 (Light) or 400 (Regular). Clean and readable.

## 📱 UI Components & Glassmorphism

### 1. Glass Cards (Global Style)
All cards (Result view, Journal items, Modal) must use this structure:
*   `backdrop-blur-md` (or `backdrop-blur-lg`)
*   `bg-white/5` (Very subtle transparency)
*   `border border-white/10` (Thin, crisp 1px border)
*   `rounded-2xl` or `rounded-3xl`

### 2. The Result Card (Guest View)
*   **Image:** 100% opacity. Sharp. Rounded corners.
*   **Text Block:**
    *   Top 2 lines: Visible.
    *   Rest: `mask-image: linear-gradient(to bottom, black 40%, transparent 100%)`.
    *   *Overlay:* Button with a **Lock Icon** (🔒) centered over the blurred area.

### 3. Micro-Interactions
*   **Input Button:** On click/hover, trigger a "Ripple" effect in Amber color.
*   **Loading State:** Do not use a standard spinner. Use a slowly breathing/pulsing gradient fog effect (`animate-pulse` on a blurred amber circle).