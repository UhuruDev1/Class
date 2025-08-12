-- Make uhuruinu@gmail.com a superadmin
UPDATE profiles 
SET role = 'superadmin'
WHERE email = 'uhuruinu@gmail.com';

-- If the user doesn't exist yet, create a placeholder profile
INSERT INTO profiles (id, email, full_name, role, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  'uhuruinu@gmail.com',
  'Super Admin',
  'superadmin',
  now(),
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE email = 'uhuruinu@gmail.com'
);
