-- Создание таблицы dreams для Visura AI
CREATE TABLE public.dreams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  content_text TEXT NOT NULL,
  title TEXT,
  interpretation_preview TEXT,
  interpretation_full TEXT,
  image_url TEXT,
  emotions TEXT[] DEFAULT '{}',
  archetypes TEXT[] DEFAULT '{}',
  language TEXT DEFAULT 'auto',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Включение RLS
ALTER TABLE public.dreams ENABLE ROW LEVEL SECURITY;

-- Policy: Гости могут создавать сны
CREATE POLICY "Guests can insert dreams"
ON public.dreams FOR INSERT
TO anon
WITH CHECK (session_id IS NOT NULL);

-- Policy: Гости могут читать свои сны по session_id
CREATE POLICY "Guests can read own dreams by session_id"
ON public.dreams FOR SELECT
TO anon
USING (session_id IS NOT NULL);

-- Policy: Авторизованные могут создавать сны
CREATE POLICY "Authenticated users can insert dreams"
ON public.dreams FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy: Авторизованные могут читать свои сны
CREATE POLICY "Authenticated users can read own dreams"
ON public.dreams FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy: Авторизованные могут обновлять свои сны
CREATE POLICY "Authenticated users can update own dreams"
ON public.dreams FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Индексы для производительности
CREATE INDEX idx_dreams_session_id ON public.dreams(session_id);
CREATE INDEX idx_dreams_user_id ON public.dreams(user_id);