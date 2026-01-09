-- Drop existing policies first to recreate them properly
DROP POLICY IF EXISTS "Authenticated users can insert dreams" ON public.dreams;
DROP POLICY IF EXISTS "Authenticated users can read own dreams" ON public.dreams;
DROP POLICY IF EXISTS "Authenticated users can update own dreams" ON public.dreams;
DROP POLICY IF EXISTS "Guests can insert dreams" ON public.dreams;
DROP POLICY IF EXISTS "Guests can read own dreams by session_id" ON public.dreams;

-- Policy 1: Allow anonymous users (guests) to INSERT dreams with session_id
CREATE POLICY "Guests can insert dreams with session_id"
ON public.dreams
FOR INSERT
TO anon
WITH CHECK (session_id IS NOT NULL AND user_id IS NULL);

-- Policy 2: Allow anonymous users to SELECT their own dreams by session_id header
CREATE POLICY "Guests can read own dreams by session_id"
ON public.dreams
FOR SELECT
TO anon
USING (session_id = current_setting('request.headers', true)::json->>'x-session-id');

-- Policy 3: Allow authenticated users to INSERT their own dreams
CREATE POLICY "Authenticated users can insert own dreams"
ON public.dreams
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy 4: Allow authenticated users to SELECT their own dreams
CREATE POLICY "Authenticated users can read own dreams"
ON public.dreams
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Policy 5: Allow authenticated users to UPDATE their own dreams
CREATE POLICY "Authenticated users can update own dreams"
ON public.dreams
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);