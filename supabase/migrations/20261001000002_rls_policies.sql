-- ENABLE RLS ON ALL TABLES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- 1. ADMIN POLICIES (Admins can do everything)
-- We check if the custom JWT claim contains role='admin'
CREATE POLICY "Admins have full access to users" ON users FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to courses" ON courses FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to enrollments" ON enrollments FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to assignments" ON assignments FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to submissions" ON submissions FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to grades" ON grades FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admins have full access to notifications" ON notifications FOR ALL TO authenticated USING (auth.jwt() ->> 'role' = 'admin');

-- 2. TEACHER POLICIES
-- Teachers can only view/edit courses they teach
CREATE POLICY "Teachers can manage their own courses" ON courses 
FOR ALL TO authenticated 
USING (auth.jwt() ->> 'role' = 'teacher' AND teacher_id = auth.uid());

-- Teachers see enrollments for their courses
CREATE POLICY "Teachers can view enrollments for their courses" ON enrollments 
FOR SELECT TO authenticated 
USING (auth.jwt() ->> 'role' = 'teacher' AND course_id IN (SELECT id FROM courses WHERE teacher_id = auth.uid()));

-- Teachers can manage assignments for their courses
CREATE POLICY "Teachers can manage assignments for their courses" ON assignments 
FOR ALL TO authenticated 
USING (auth.jwt() ->> 'role' = 'teacher' AND course_id IN (SELECT id FROM courses WHERE teacher_id = auth.uid()));

-- Teachers see submissions made to their assignments
CREATE POLICY "Teachers can view and grade submissions for their courses" ON submissions 
FOR ALL TO authenticated 
USING (auth.jwt() ->> 'role' = 'teacher' AND assignment_id IN (
    SELECT a.id FROM assignments a JOIN courses c ON a.course_id = c.id WHERE c.teacher_id = auth.uid()
));

-- Teachers manage grades they gave
CREATE POLICY "Teachers can manage grades they gave" ON grades 
FOR ALL TO authenticated 
USING (auth.jwt() ->> 'role' = 'teacher' AND grader_id = auth.uid());


-- 3. STUDENT POLICIES
-- Students can see their own profile
CREATE POLICY "Students can view their own profile" ON users 
FOR SELECT TO authenticated 
USING (id = auth.uid());

-- Students can see courses they are enrolled in
CREATE POLICY "Students can view courses they are enrolled in" ON courses 
FOR SELECT TO authenticated 
USING (id IN (SELECT course_id FROM enrollments WHERE student_id = auth.uid()));

-- Students can only see their own enrollments
CREATE POLICY "Students can view their own enrollments" ON enrollments 
FOR SELECT TO authenticated 
USING (student_id = auth.uid());

-- Students can view assignments for their enrolled courses
CREATE POLICY "Students can view assignments for their courses" ON assignments 
FOR SELECT TO authenticated 
USING (course_id IN (SELECT course_id FROM enrollments WHERE student_id = auth.uid()));

-- Students can create and view their own submissions
CREATE POLICY "Students can manage their own submissions" ON submissions 
FOR ALL TO authenticated 
USING (student_id = auth.uid());

-- Students can view their own grades
CREATE POLICY "Students can view their own grades" ON grades 
FOR SELECT TO authenticated 
USING (submission_id IN (SELECT id FROM submissions WHERE student_id = auth.uid()));

-- ALL USERS (Notifications)
CREATE POLICY "Users can manage their own notifications" ON notifications 
FOR ALL TO authenticated 
USING (user_id = auth.uid());
