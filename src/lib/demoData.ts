
import { GraduationCap, BookOpen, Users, Building, Calendar, BarChart3, CloudRain } from "lucide-react";

export const demoData = {
    admin: {
        user: { name: "Demo Admin", role: "Super Admin", email: "admin@demo.edu" },
        stats: {
            totalStudents: 1250,
            totalTeachers: 85,
            totalSubjects: 48,
            totalBatches: 12,
            activeAssignments: 156,
            pendingGrading: 342
        },
        recentActivity: [
            { id: 1, action: "New student registered", user: "Alice Johnson", time: "2 mins ago" },
            { id: 2, action: "Assignment limit updated", user: "System", time: "1 hour ago" },
            { id: 3, action: "New teacher added", user: "Dr. Smith", time: "3 hours ago" },
        ]
    },
    teacher: {
        user: { name: "Prof. Sarah Wilson", role: "Senior Faculty", email: "teacher@demo.edu", id: "demo-teacher-1" },
        classes: [
            { code: "CS101", name: "Intro to CS", students: 45 },
            { code: "CS102", name: "Data Structures", students: 38 },
            { code: "CS201", name: "Algorithms", students: 42 },
        ],
        recentActivity: [
            { id: 1, action: "Assignment submitted", student: "John Doe", subject: "CS101", time: "10 mins ago" },
            { id: 2, action: "Grade posted", student: "Emma Davis", subject: "CS102", time: "45 mins ago" },
        ],
        assignments: [
            { id: "demo-a1", title: "Binary Trees Quiz", class_id: "CS102", created_at: "2024-03-10", description: "Implement a binary search tree in Python." },
            { id: "demo-a2", title: "Sorting Algorithms", class_id: "CS201", created_at: "2024-03-12", description: "Compare Merge Sort and Quick Sort performance." },
        ],
        submissions: [
            { id: "sub-1", assignment_id: "demo-a1", student_id: "s1", student_name: "John Doe", submitted_at: "2024-03-14", status: "submitted", file_url: "#" },
            { id: "sub-2", assignment_id: "demo-a1", student_id: "s2", student_name: "Jane Smith", submitted_at: "2024-03-14", status: "graded", grade: "92", file_url: "#" },
        ]
    },
    student: {
        user: { name: "Alex Student", role: "Student", email: "student@demo.edu", id: "demo-student-1" },
        stats: {
            assignmentsPending: 3,
            attendance: "92%",
            averageGrade: "A-",
            creditsEarned: 18
        },
        enrolledClasses: [
            { code: "CS101", name: "Intro to Computer Science", instructor: "Prof. Wilson", progress: 75 },
            { code: "MATH101", name: "Calculus I", instructor: "Dr. Brown", progress: 60 },
            { code: "PHY101", name: "Physics I", instructor: "Dr. Lee", progress: 85 },
        ],
        assignments: [
            { id: "demo-a1", title: "Binary Trees Implementation", subject: "CS102", due_date: "Tomorrow", status: "pending" },
            { id: "demo-a2", title: "Calculus Problem Set 3", subject: "MATH101", due_date: "In 2 days", status: "pending" },
            { id: "demo-a3", title: "Physics Lab Report", subject: "PHY101", due_date: "Next Week", status: "submitted" },
        ],
        recentGrades: [
            { subject: "CS101", task: "Midterm Exam", grade: "94/100", date: "2 days ago" },
            { subject: "MATH101", task: "Quiz 2", grade: "88/100", date: "1 week ago" },
        ]
    }
};
