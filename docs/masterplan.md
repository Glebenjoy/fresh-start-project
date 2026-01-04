# Masterplan: Visura AI — Dream Interpretation & Visualization Ecosystem

## 1. Executive Summary (Резюме)
**Visura AI** — это веб-приложение (PWA, Mobile First) для психологической интерпретации снов через визуальные образы.
Мы уходим от эзотерики в сторону **Юнгианского анализа** и **эстетики Mindfulness**.

**Ключевое отличие (UVP):**
Стратегия "Input First". Пользователь получает визуализацию своего подсознания (HD-картинку) мгновенно и бесплатно, но глубокий смысловой анализ открывается только после регистрации/подписки.

**Бизнес-модель (Visual-Led Freemium):**
* **Guest (Гость):** Мгновенный вход -> Ввод сна -> HD Картинка (Награда) + Тизер смысла.
* **User (Регистрация):** Полный текст толкования, сохранение в Дневник.
* **Premium (Future):** Безлимит, Голосовой ввод, Аналитика паттернов, PDF-экспорт.

---

## 2. Target Audience (Аудитория)
* **The Seeker:** Люди, ищущие смыслы (Yoga, Meditation, Mindfulness). Хотят понять себя.
* **The Visualizer:** Эстеты, которые хотят увидеть свои сны. Для них важна красота картинки.
* **The Anxious:** Люди, которых беспокоят кошмары. Им нужно успокоение и объяснение (Safe Guarding).

---

## 3. User Stories (Сценарии)

### Epic 1: Instant Value (Input First)
* **[US-1.1]** Как гость, я хочу сразу увидеть кнопку ввода сна, без регистрации и онбординга.
* **[US-1.2]** Я хочу увидеть **четкую HD-картинку** своего сна как доказательство работы AI.
* **[US-1.3]** Я хочу видеть только начало толкования, чтобы у меня возник интерес "раскрыть" остальное.

### Epic 2: Conversion (Unlock)
* **[US-2.1]** Когда я нажимаю "Узнать смысл", я готов зарегистрироваться, чтобы прочитать полный текст.
* **[US-2.2]** После регистрации мой текущий сон должен автоматически сохраниться в мой новый профиль.

### Epic 3: Retention (Дневник)
* **[US-3.1]** Я хочу видеть историю своих снов в виде красивой галереи.
* **[US-3.2]** Я хочу получать месячный отчет о моих эмоциональных паттернах (например, "В этом месяце много тревоги").

---

## 4. Technical Stack (Стек)

### Frontend
* **Framework:** Lovable (React 18 + TypeScript + Vite).
* **UI Kit:** Shadcn UI + Tailwind CSS.
* **Animation:** Framer Motion (эффекты тумана, появления).

### Backend & AI (Low-Code)
* **Orchestration:** n8n (Webhook workflow).
* **Text AI:** Anthropic Claude 3.5 Sonnet (Роль: Психоаналитик).
* **Image AI:** OpenAI DALL-E 3 (Роль: Художник-сюрреалист).

### Database & Auth
* **System:** Supabase.
* **Auth:** Email Magic Link + Google.
* **Storage:** Supabase Storage (для картинок).

---

## 5. Data Model (Схема БД)

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
