# Design Guidelines: Visura AI (Ultra Detail)

## 🎨 Philosophy
**"Holographic Void"**. Интерфейс — это глубокий космос (Deep Space), в котором живут живые, светящиеся объекты.
Никакого плоского пластика. Всё должно двигаться, дышать и реагировать на курсор.
Главное правило: **High Contrast & Motion**.

## 🛠 Tech Stack (Strict)
*   **Icons:** `lucide-react`. Stroke: `1.5px` (Thin).
*   **Fonts:** `Inter` (Google Fonts).
*   **Animation:** `framer-motion` (Crucial for smooth entry/exit).
*   **Styling:** Tailwind CSS.

## 🌈 The Atmosphere (Background)
The background is NOT static. It must look like a living aura.
*   **Base:** `#000000` (Pure Black).
*   **The Aurora:** Use large, blurred blobs (`blur-[120px]`) positioned absolutely behind the content.
    *   Color 1: `bg-indigo-600/20` (Top Left).
    *   Color 2: `bg-fuchsia-600/10` (Bottom Right).
    *   *Animation:* These blobs should slowly float (`animate-pulse` or custom float animation).

## 🧩 Component Library

### 1. Primary Action Button (The "Visualize" Capsule)
This is the most important element on the screen.
*   **Shape:** Full Capsule (`rounded-full`).
*   **Background:** Holographic Gradient:
    *   `bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`.
*   **Text:** White, Bold (`font-semibold`), Tracking wide.
*   **Interaction (Hover):**
    *   Scale up slightly (`scale-105`).
    *   Increase brightness (`brightness-110`).
    *   Shadow bloom: `shadow-[0_0_20px_rgba(168,85,247,0.5)]`.
*   **Interaction (Click):** Scale down (`scale-95`).

### 2. The Input Field (Stealth Mode)
Don't create a "box". Let the user type into the void.
*   **Background:** Transparent (`bg-transparent`).
*   **Border:** None initially. Bottom border ONLY on focus.
*   **Text:** Huge (`text-2xl`), Centered, White.
*   **Placeholder:** `#FFFFFF/20` (Subtle).
*   **Cursor:** Fluorescent Pink or Indigo (`caret-pink-500`).

### 3. Glass Cards (Containers)
*   **Bg:** `bg-zinc-900/40` (Darker glass).
*   **Border:** `border-white/5` (Barely visible).
*   **Backdrop:** `backdrop-blur-xl`.
*   **Radius:** `rounded-3xl`.

## ⏳ The Loading Experience (Hypnotic)
**Concept:** "Neural Synthesis". Do not use a spinner.
1.  **Visual:** A central "Orb" composed of multiple spinning rings or a breathing gradient circle. It should cycle through the logo colors (Indigo -> Cyan -> Pink).
2.  **Text:** Instead of random facts, show "System Operations" to make it feel techy:
    *   *"Connecting to subconscious..."*
    *   *"Detecting emotional patterns..."*
    *   *"Weaving visual textures..."*
    *   *"Rendering high-fidelity dreamscape..."*
3.  **Speed:** Text changes every 800ms (fast, dynamic).

## 📱 Typography Hierarchy
*   **H1 (Logo Title):** `Inter`, ExtraBold (800), Tracking `-0.05em`. Gradient Text (White to Grey).
*   **H2 (Headlines):** `Inter`, SemiBold (600). White.
*   **Body:** `Inter`, Regular (400). Color: `#94A3B8` (Cool Grey).

## 🖱 Micro-Interactions
*   **Page Load:** All elements must `fade-in-up` (opacity 0 -> 1, y 20 -> 0) with staggered delays.
*   **Result Reveal:** When the image loads, do not just "show" it. Reveal it slowly with a blur-to-sharp transition (`blur-lg` -> `blur-0`).
