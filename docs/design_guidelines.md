# Design Guidelines: Visura AI

## 🎨 Philosophy
**"Mystic Clarity"**. Глубина, Тайна, Инсайт.

## 🛠 Technical Specs
* **Icons:** `lucide-react` with `strokeWidth={1.5}` (Thin & Elegant).
* **Fonts:** `Playfair Display` (Headings), `Inter` or `Manrope` (Body).
* **Radius:** `rounded-2xl` or `rounded-3xl` for all cards.

## 🌈 Colors (Tailwind)
* **Background:** `bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-gray-950 to-black`.
* **Amber Accent:** `#FFBF00` (Glow effects).
* **Glass Surface:** `bg-white/5` + `backdrop-blur-md` + `border-white/10`.

## 📱 UI Components

### 1. Social Share Card (Generated)
Карточка, которая генерируется для сторис:
* **Ratio:** 9:16 (Vertical).
* **Content:**
    * Top: HD Dream Image.
    * Bottom: Dark gradient overlay.
    * Footer: Logo "Visura AI" + Text "Decode your subconscious".
* *Purpose:* Brand awareness.

### 2. The Hook Text (Blur Effect)
Для незарегистрированных:
* CSS Mask: `mask-image: linear-gradient(to bottom, black 0%, black 40%, transparent 95%)`.
* Overlay Button: Centered "Unlock Meaning 🔒".

### 3. Loading State
* **Visual:** "Breathing" Amber Sphere (`animate-pulse` + `blur-xl`).
* **Typography:** Fact text should be `animate-fade-in-up` (smooth transition).