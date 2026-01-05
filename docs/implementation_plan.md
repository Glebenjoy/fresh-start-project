# Implementation Plan: Visura AI

## 🗓 Phase 1: Data & Logic (n8n Backend)
**Focus:** AI Personality & Data Structure.
1.  **Supabase:**
    * Настроить таблицу `dreams`. RLS Policy: Разрешить `INSERT` для `anon` роли (для гостей).
2.  **n8n Workflow:**
    * **System Prompt (Claude 3.5):**
        * *"You are a Jungian analyst. Your first 2 sentences must be a provocative psychological hook, addressing the user directly. No 'Hello'. Go straight to the deep meaning."*
    * **Output JSON:** `{ title, hook_text, full_analysis, image_prompt }`.
    * **DALL-E 3:** Генерация по промпту от Claude.

## 🗓 Phase 2: Frontend MVP (Reliability)
**Focus:** Input First & Persistence.
1.  **Local Storage Logic:**
    * При вводе сна: `localStorage.setItem('current_dream_text', text)`.
    * При получении результата: `localStorage.setItem('current_dream_result', json)`.
    * *Цель:* Если юзер обновит страницу, восстановить состояние экрана "Результат".
2.  **Loading Screen:**
    * Реализовать массив фактов `const facts = [...]`.
    * Таймер `setInterval` для смены фактов каждые 4 сек.
3.  **Guest Mode UI:**
    * Компонент `DreamResult`: Картинка всегда `visible`. Текст имеет класс `mask-image-gradient` если юзер не залогинен.

## 🗓 Phase 3: Polish & Sharing (Virality)
**Focus:** Design & Growth.
1.  **Branded Sharing:**
    * Использовать `html2canvas` (или аналог).
    * При нажатии Share: Рендерить невидимый `div` (Картинка + Лого Visura + QR код) -> Конвертировать в PNG -> Открыть Native Share Dialog.
2.  **Animations:**
    * Framer Motion для плавного появления элементов.

## 🗓 Phase 4: Launch
1.  **PWA:** Настройка манифеста (Icon, Name: Visura).
2.  **Testing:** Пройти весь флоу как гость, перезагрузить страницу на середине, проверить сохранение.