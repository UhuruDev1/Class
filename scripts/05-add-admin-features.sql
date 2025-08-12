-- Add admin flag to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Update a user to be admin (replace with actual user email)
-- UPDATE profiles SET is_admin = true WHERE email = 'admin@example.com';

-- Create admin_logs table for audit trail
CREATE TABLE IF NOT EXISTS admin_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    target_type VARCHAR(50) NOT NULL, -- 'user', 'course', 'post', etc.
    target_id UUID,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES auth.users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('platform_name', '"AI Mastery Academy"', 'The name of the platform'),
('max_enrollment_per_user', '50', 'Maximum number of courses a user can enroll in'),
('enable_social_features', 'true', 'Enable or disable social features'),
('maintenance_mode', 'false', 'Enable maintenance mode'),
('default_course_price', '99', 'Default price for new courses')
ON CONFLICT (setting_key) DO NOTHING;

-- Create content_reports table for moderation
CREATE TABLE IF NOT EXISTS content_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    reporter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content_type VARCHAR(20) NOT NULL CHECK (content_type IN ('post', 'comment', 'course', 'message')),
    content_id UUID NOT NULL,
    reason VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_user_id ON admin_logs(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_content_reports_status ON content_reports(status);
CREATE INDEX IF NOT EXISTS idx_content_reports_content_type ON content_reports(content_type);

-- Enable RLS
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_logs
CREATE POLICY "Only admins can view admin logs" ON admin_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = true
        )
    );

CREATE POLICY "Only admins can insert admin logs" ON admin_logs
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = true
        )
    );

-- RLS Policies for system_settings
CREATE POLICY "Only admins can view system settings" ON system_settings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = true
        )
    );

CREATE POLICY "Only admins can update system settings" ON system_settings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = true
        )
    );

-- RLS Policies for content_reports
CREATE POLICY "Users can view their own reports" ON content_reports
    FOR SELECT USING (
        reporter_id = auth.uid() OR 
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = true
        )
    );

CREATE POLICY "Users can create reports" ON content_reports
    FOR INSERT WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Only admins can update reports" ON content_reports
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.is_admin = true
        )
    );

-- Function to log admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
    p_action VARCHAR(100),
    p_target_type VARCHAR(50),
    p_target_id UUID DEFAULT NULL,
    p_details JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    log_id UUID;
BEGIN
    INSERT INTO admin_logs (admin_user_id, action, target_type, target_id, details)
    VALUES (auth.uid(), p_action, p_target_type, p_target_id, p_details)
    RETURNING id INTO log_id;
    
    RETURN log_id;
END;
$$;
