export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    avatar?: string;
}

export interface Assignment {
    id: string;
    title: string;
    subject: string;
    dueDate: string;
    status: 'pending' | 'submitted' | 'graded';
    grade?: string;
    feedback?: string;
    description?: string;
}

export interface Submission {
    id: string;
    studentId: string;
    studentName: string;
    assignmentId: string;
    assignmentTitle: string;
    submittedAt: string;
    fileUrl?: string;
    content?: string;
    grade?: string;
    feedback?: string;
    status: 'pending' | 'graded';
}

export interface Stats {
    totalStudents: number;
    totalTeachers: number;
    totalSubjects: number;
    totalBatches: number;
    activeAssignments: number;
    pendingGrading: number;
}
