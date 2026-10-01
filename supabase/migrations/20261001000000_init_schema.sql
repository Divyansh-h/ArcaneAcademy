-- Enable UUID extension (often pre-enabled on Supabase, but good practice)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT chk_users_role CHECK (role IN ('student', 'teacher', 'admin'))
);

-- 2. COURSES
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    teacher_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_courses_teacher FOREIGN KEY (teacher_id) 
        REFERENCES users(id) ON DELETE CASCADE
);

-- 3. ENROLLMENTS
CREATE TABLE enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL,
    course_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_enrollments_student FOREIGN KEY (student_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_enrollments_course FOREIGN KEY (course_id) 
        REFERENCES courses(id) ON DELETE CASCADE,
    CONSTRAINT uq_student_course UNIQUE (student_id, course_id)
);

-- 4. ASSIGNMENTS
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url VARCHAR(1024),
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_assignments_course FOREIGN KEY (course_id) 
        REFERENCES courses(id) ON DELETE CASCADE
);

-- 5. SUBMISSIONS
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID NOT NULL,
    student_id UUID NOT NULL,
    file_url VARCHAR(1024) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_submissions_assignment FOREIGN KEY (assignment_id) 
        REFERENCES assignments(id) ON DELETE CASCADE,
    CONSTRAINT fk_submissions_student FOREIGN KEY (student_id) 
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_submissions_status CHECK (status IN ('pending', 'processing', 'graded')),
    CONSTRAINT uq_assignment_student UNIQUE (assignment_id, student_id)
);

-- 6. GRADES
CREATE TABLE grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID UNIQUE NOT NULL,
    grader_id UUID,
    score DECIMAL(5,2),
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_grades_submission FOREIGN KEY (submission_id) 
        REFERENCES submissions(id) ON DELETE CASCADE,
    CONSTRAINT fk_grades_grader FOREIGN KEY (grader_id) 
        REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT chk_grades_score CHECK (score >= 0 AND score <= 100)
);

-- 7. NOTIFICATIONS
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) 
        REFERENCES users(id) ON DELETE CASCADE
);
