CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    companion_id UUID REFERENCES companions(id) ON DELETE SET NULL, -- Or ON DELETE CASCADE
    user_id  TEXT NOT NULL,,
    session_id UUID REFERENCES session_history(id) ON DELETE SET NULL, -- Or ON DELETE CASCADE
    title TEXT NOT NULL,
    subject TEXT,
    topic TEXT,
    language VARCHAR(10),
    difficulty VARCHAR(20) DEFAULT 'medium',
    num_questions INT DEFAULT 0,
    questions JSONB, -- Default NULL or empty array '[]'::jsonb
    metadata JSONB -- For extra info
);

-- Enable Row Level Security (RLS) - IMPORTANT!
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;

-- Create policies (EXAMPLES - adjust to your needs)
CREATE POLICY "Users can view their own quizzes"
ON quizzes
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert quizzes for themselves (if server-side)"
ON quizzes
FOR INSERT
WITH CHECK (auth.uid() = user_id); 
-- Note: Since this is a server action, it uses the service_role key by default, 
-- which bypasses RLS. So this INSERT policy is more for if you ever allow client-side inserts.
-- For server actions, the RLS on SELECT is more immediately relevant for fetching.

-- Optional: Indexes for faster querying
CREATE INDEX idx_quizzes_user_id ON quizzes(user_id);
CREATE INDEX idx_quizzes_companion_id ON quizzes(companion_id);
CREATE INDEX idx_quizzes_session_id ON quizzes(session_id);
CREATE INDEX idx_quizzes_topic ON quizzes(topic); -- If you search by topic often