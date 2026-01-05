# Masterplan: Visura AI — Dream Interpretation & Visualization Ecosystem

## 1. Executive Summary (Резюме)
**Visura AI** — это веб-приложение (PWA, Mobile First) для психологической интерпретации снов через визуальные образы.
Мы заменяем эзотерику на **Юнгианский анализ**, эстетику **Mindfulness** и стратегию **"Input First"**.

**Ключевое отличие (UVP):**
Пользователь получает HD-визуализацию своего подсознания бесплатно и мгновенно. Это "крючок". Глубокий смысл и аналитика открываются после регистрации.

**Бизнес-модель (Visual-Led Freemium):**
* **Guest (Гость):** Ввод сна -> HD Картинка + Психологический хук (Тизер).
* **User (Регистрация):** Полный текст, Сохранение в Дневник, Брендированный шеринг.
* **Premium (Future):** Безлимит, Голос, Анализ паттернов.

---

## 2. Target Audience (Аудитория)
* **The Seeker:** Ищет смыслы, занимается саморазвитием.
* **The Visualizer:** Эстет, хочет увидеть красивый арт своего сна.
* **The Anxious:** Ищет успокоение от тревожных снов.

---

## 3. User Stories (Сценарии)

### Epic 1: Instant Value & Engagement
* **[US-1.1]** Как гость, я хочу ввести сон сразу, без регистрации.
* **[US-1.2]** Пока идет генерация (20 сек), я хочу читать интересные факты о снах, чтобы не скучать.
* **[US-1.3]** Если я случайно закрою браузер, мой введенный сон должен сохраниться (Local Storage).

### Epic 2: The Hook (Revelation)
* **[US-2.1]** Я хочу увидеть **четкую HD-картинку** — это моя награда.
* **[US-2.2]** Первые строки текста должны меня "зацепить" и заинтриговать, чтобы я захотел открыть остальное.
* **[US-2.3]** Я хочу поделиться красивой карточкой сна с логотипом Visura в соцсетях.

### Epic 3: Conversion & Retention
* **[US-3.1]** Я готов зарегистрироваться, чтобы "разблюрить" полный анализ.
* **[US-3.2]** После регистрации сон автоматически переносится в мой новый аккаунт.

---

## 4. Technical Stack
* **Frontend:** Lovable (React 18 + TypeScript + Vite).
* **Style:** Tailwind CSS + Shadcn UI + Framer Motion.
* **Backend:** n8n (Webhook workflow).
* **AI:** Anthropic Claude 3.5 Sonnet (Text), OpenAI DALL-E 3 (Image).
* **DB & Auth:** Supabase.

---

## 5. Data Model (Supabase Schema)

```sql
-- Таблица пользователей
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  context_profile JSONB -- {"gender": "f", "mood": "calm"}
);

-- Таблица снов
CREATE TABLE public.dreams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id), -- NULL для гостей
  session_id TEXT, -- ID из LocalStorage для связи гостя
  content_text TEXT NOT NULL,
  
  -- AI Результаты
  interpretation_preview TEXT, -- "Hook" (первые 2 предложения)
  interpretation_full TEXT, -- Полный текст
  image_url TEXT, -- Ссылка на HD картинку
  
  -- Метаданные
  created_at TIMESTAMPTZ DEFAULT NOW()
);
