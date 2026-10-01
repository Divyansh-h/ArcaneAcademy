-- Disable transaction for concurrent index creation
-- (Supabase requires concurrent indexes to be created outside of standard transaction blocks if using certain workflows, 
-- but they are crucial for production so they don't lock tables during creation).

-- 1. Foreign Key Index on courses (Crucial for all Teacher Dashboard queries)
-- Query 2, 6, 7 rely heavily on starting from a specific teacher.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_courses_teacher 
ON courses (teacher_id);

-- 2. Composite Index with correct order (Equality first, Range second)
-- Query 4: Overdue assignments filters by course_id (equality) and due_date (range < NOW()).
-- By putting course_id first, Postgres can instantly jump to the course, then scan the due_date range.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_assignments_course_due 
ON assignments (course_id, due_date);

-- 3. Partial Index for Teacher's Pending Submissions
-- Query 2: Only cares about 'pending' or 'processing' submissions.
-- A partial index ignores graded submissions completely, keeping the index tiny and lightning fast.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_submissions_pending 
ON submissions (assignment_id, created_at) 
WHERE status IN ('pending', 'processing');

-- 4. Covering Index using INCLUDE
-- Query 3: Admin Enrollment counts per course.
-- We only need to COUNT(student_id) grouped by course_id. By including student_id, 
-- Postgres performs an 'Index Only Scan' without ever reading the actual enrollments table data pages.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_enrollments_course_cover 
ON enrollments (course_id) INCLUDE (student_id);

-- 5. Foreign Key Index on Submissions (Needed for Joins)
-- Query 5, 8: Need to join assignments to submissions.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_submissions_assignment 
ON submissions (assignment_id);

-- 6. Partial Covering Index on Grades for Failing Students
-- Query 7: Finds students needing attention (score < 50).
-- This keeps the index extremely small and allows instant lookups for struggling students.
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_grades_failing 
ON grades (score) INCLUDE (submission_id) 
WHERE score < 50.0;
