-- SQL Test Script to prove Row Level Security
-- Uses pgTAP (standard in Supabase) or can be run manually in psql

BEGIN;

-- Create some dummy records for testing (assuming schema is already applied)
-- We bypass RLS to set up the state
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments DISABLE ROW LEVEL SECURITY;

INSERT INTO users (id, name, email, password_hash, role) VALUES 
('11111111-1111-1111-1111-111111111111', 'Admin user', 'admin@test.com', 'hash', 'admin'),
('22222222-2222-2222-2222-222222222222', 'Teacher user', 'teacher@test.com', 'hash', 'teacher'),
('33333333-3333-3333-3333-333333333333', 'Student user', 'student@test.com', 'hash', 'student'),
('44444444-4444-4444-4444-444444444444', 'Other student', 'other@test.com', 'hash', 'student');

INSERT INTO courses (id, title, teacher_id) VALUES 
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Potions', '22222222-2222-2222-2222-222222222222');

INSERT INTO enrollments (id, student_id, course_id) VALUES 
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '44444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

----------------------------------------------------------------------
-- TEST 1: ADMIN ROLE
----------------------------------------------------------------------
-- Simulate an Admin logging in via PostgREST JWT
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "11111111-1111-1111-1111-111111111111", "role": "admin"}';

-- Admin should see ALL enrollments (Expected: 2)
DO $$
DECLARE count_val INT;
BEGIN
  SELECT COUNT(*) INTO count_val FROM enrollments;
  ASSERT count_val = 2, 'Admin failed to see all enrollments';
END $$;


----------------------------------------------------------------------
-- TEST 2: TEACHER ROLE
----------------------------------------------------------------------
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "22222222-2222-2222-2222-222222222222", "role": "teacher"}';

-- Teacher should see their course (Expected: 1)
DO $$
DECLARE count_val INT;
BEGIN
  SELECT COUNT(*) INTO count_val FROM courses;
  ASSERT count_val = 1, 'Teacher failed to see their course';
END $$;

-- Teacher should see both enrollments in their course (Expected: 2)
DO $$
DECLARE count_val INT;
BEGIN
  SELECT COUNT(*) INTO count_val FROM enrollments;
  ASSERT count_val = 2, 'Teacher failed to see enrollments for their course';
END $$;


----------------------------------------------------------------------
-- TEST 3: STUDENT ROLE
----------------------------------------------------------------------
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub": "33333333-3333-3333-3333-333333333333", "role": "student"}';

-- Student should ONLY see their own enrollment, not the other student's (Expected: 1)
DO $$
DECLARE count_val INT;
BEGIN
  SELECT COUNT(*) INTO count_val FROM enrollments;
  ASSERT count_val = 1, 'Student saw someone else''s enrollment (RLS Failed)';
END $$;

ROLLBACK;
