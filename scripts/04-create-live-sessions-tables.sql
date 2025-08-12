-- Create live_sessions table
CREATE TABLE IF NOT EXISTS live_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    max_participants INTEGER DEFAULT 100,
    status VARCHAR(20) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'ended', 'cancelled')),
    is_public BOOLEAN DEFAULT false,
    meeting_url TEXT,
    recording_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create session_messages table for live chat
CREATE TABLE IF NOT EXISTS session_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES live_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'emoji', 'system')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create session_participants table
CREATE TABLE IF NOT EXISTS session_participants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES live_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    left_at TIMESTAMP WITH TIME ZONE,
    hand_raised BOOLEAN DEFAULT false,
    is_presenter BOOLEAN DEFAULT false,
    UNIQUE(session_id, user_id)
);

-- Create whiteboard_data table for collaborative whiteboard
CREATE TABLE IF NOT EXISTS whiteboard_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES live_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    drawing_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample live sessions
INSERT INTO live_sessions (course_id, title, description, scheduled_at, duration_minutes, max_participants, is_public, status) 
SELECT 
    c.id,
    'Live Q&A: ' || c.title,
    'Interactive session with the instructor to answer your questions and dive deeper into the course material.',
    NOW() + INTERVAL '2 days',
    90,
    50,
    false,
    'scheduled'
FROM courses c
WHERE c.title LIKE '%AI%'
LIMIT 3;

-- Insert a public session
INSERT INTO live_sessions (course_id, title, description, scheduled_at, duration_minutes, max_participants, is_public, status)
SELECT 
    c.id,
    'Free Introduction to AI Workshop',
    'Join us for a free introduction to artificial intelligence. Perfect for beginners!',
    NOW() + INTERVAL '1 day',
    60,
    100,
    true,
    'scheduled'
FROM courses c
WHERE c.price = 0
LIMIT 1;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_live_sessions_scheduled_at ON live_sessions(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_live_sessions_status ON live_sessions(status);
CREATE INDEX IF NOT EXISTS idx_session_messages_session_id ON session_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_session_participants_session_id ON session_participants(session_id);

-- Enable RLS
ALTER TABLE live_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE whiteboard_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view live sessions for enrolled courses or public sessions" ON live_sessions
    FOR SELECT USING (
        is_public = true OR 
        course_id IN (
            SELECT course_id FROM enrollments WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can view session messages for sessions they can access" ON session_messages
    FOR SELECT USING (
        session_id IN (
            SELECT id FROM live_sessions WHERE 
                is_public = true OR 
                course_id IN (
                    SELECT course_id FROM enrollments WHERE user_id = auth.uid()
                )
        )
    );

CREATE POLICY "Users can insert their own session messages" ON session_messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view session participants for accessible sessions" ON session_participants
    FOR SELECT USING (
        session_id IN (
            SELECT id FROM live_sessions WHERE 
                is_public = true OR 
                course_id IN (
                    SELECT course_id FROM enrollments WHERE user_id = auth.uid()
                )
        )
    );

CREATE POLICY "Users can insert their own participation record" ON session_participants
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participation record" ON session_participants
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view whiteboard data for accessible sessions" ON whiteboard_data
    FOR SELECT USING (
        session_id IN (
            SELECT id FROM live_sessions WHERE 
                is_public = true OR 
                course_id IN (
                    SELECT course_id FROM enrollments WHERE user_id = auth.uid()
                )
        )
    );

CREATE POLICY "Users can insert their own whiteboard data" ON whiteboard_data
    FOR INSERT WITH CHECK (auth.uid() = user_id);
