# Design Guidelines: Visura AI (Deep Glass)

## 🎨 Philosophy
**"Cinematic Void"**. Мы отказываемся от "мыльного" глассморфизма в стиле iOS.
Наш стиль: Глубокий черный фон, высокая резкость, минимализм.
Интерфейс должен быть "невидимым", чтобы внимание было приковано к Логотипу и Картинкам снов.

## 🛠 Tech Implementation Specs
*   **Icons:** `lucide-react`. Use `strokeWidth={1.5}`. Color: White.
*   **Fonts:** `Inter` or `Geist Sans` (Clean, Modern, Tech). No Serifs.
*   **Styling:** Tailwind CSS.

## 🌈 Color Palette

### Backgrounds
*   **Global Background:** Pure Black (`#000000`). No gradients.
*   **Surface (Cards/Inputs):** `#0A0A0A` (Almost black).
*   **Borders:** `border-white/10` (Very subtle).

### Accents (The Light)
*   **Primary Button:**
    *   Background: White (`#FFFFFF`).
    *   Text: Black (`#000000`).
    *   Effect: On hover, show a subtle "Prism" shadow (`shadow-[0_0_20px_rgba(255,255,255,0.3)]`).
*   **Secondary Elements:** Cool Grey (`#A1A1AA`).

## 📱 UI Components

### 1. Minimalist Input
*   Background: Transparent.
*   Border: Bottom only (`border-b border-white/20`).
*   Typography: Large text, Thin font weight.
*   *Idea:* It should look like a command line or a clean whisper input.

### 2. The Result Card
*   Sharp corners (`rounded-lg`, not `rounded-3xl` - less "bubbly").
*   No background color, just the Image.
*   Text below the image: Clean, simple, readable.

### 3. Glass Elements (Restricted)
Use `backdrop-blur` ONLY for sticky elements (like the top navigation bar or floating modals). Everything else should be solid black for maximum contrast.
