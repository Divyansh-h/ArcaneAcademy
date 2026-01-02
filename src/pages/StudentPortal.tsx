
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Award, Clock, CheckCircle, ChevronRight, Upload, X } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { PortalLayout } from "@/components/layout/PortalLayout";
import api from "@/lib/api";
import { demoData } from "@/lib/demoData";
import { Assignment, Submission } from "@/types";
import { config } from "@/lib/config";

const StudentPortal = ({ demoMode = false }: { demoMode?: boolean }) => {
    // User logic: use demo user or local storage
    const user = demoMode ? demoData.student.user : JSON.parse(localStorage.getItem('user') || '{}');
    const studentName = user.name || "Student";

    // Component State
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(!demoMode);

    // Submission modal logic
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Stats: use demo stats or defaults
    const stats = demoMode ? demoData.student.stats : { assignmentsPending: 3, attendance: "85%", averageGrade: "B+", creditsEarned: 12 };

    // Initial Data Fetch
    useEffect(() => {
        if (demoMode) {
            setAssignments(demoData.student.assignments as unknown as Assignment[]);
            setSubmissions([]); // Demo assignments have status built-in or handled locally
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Mocking assignment fetch
                const assignmentsRes = await api.get(config.api.endpoints.grading.assignments);
                // Mocking submissions fetch
                const submissionsRes = await api.get(`${config.api.endpoints.grading.submissions}?student_id=${user.id}`);

                if (assignmentsRes.data.success) {
                    setAssignments(assignmentsRes.data.data);
                }

                if (submissionsRes.data.success) {
                    setSubmissions(submissionsRes.data.data);
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch student data", error);
                setLoading(false);
            }
        };

        if (user.id) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [user.id, demoMode]);

    // Handle File Upload
    const handleSubmitAssignment = async () => {
        if (!selectedAssignment || !selectedFile) return;
        setIsSubmitting(true);

        if (demoMode) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert("✅ Demo Mode: Assignment submitted successfully!");
            // Optimistic update for demo
            setAssignments(prev => prev.map(a => a.id === selectedAssignment.id ? { ...a, status: 'submitted' } : a));
            setShowSubmitModal(false);
            setSelectedFile(null);
            setIsSubmitting(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('assignment_id', selectedAssignment.id);
            formData.append('student_id', user.id);
            formData.append('file', selectedFile);

            await api.post('/grading/submissions', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setShowSubmitModal(false);
            setSelectedFile(null);
            alert("✅ Assignment submitted successfully!");
        } catch (error) {
            console.error("Submission failed", error);
            alert("Failed to submit");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Derived State: Merge assignments with submission status
    const mergedAssignments = demoMode ? assignments : assignments.map(a => {
        const sub = submissions.find(s => s.assignmentId === a.id);
        return {
            ...a,
            status: sub ? (sub.status === 'graded' ? 'graded' : 'submitted') : 'pending',
            grade: sub?.grade,
            feedback: sub?.feedback,
            submissionDate: sub?.submittedAt,
            dueDate: a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No Due Date"
        };
    });

    // Sort: Pending first
    mergedAssignments.sort((a, _b) => (a.status === 'pending' ? -1 : 1));

    if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-zinc-900"></div></div>;

    return (
        <PortalLayout userType="student" userName={user.name} demoMode={demoMode}>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Welcome back, {studentName.split(' ')[0]} 👋</h1>
                        <p className="text-zinc-500 dark:text-zinc-400">Here's your academic progress overview</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Pending Assignments" value={stats.assignmentsPending} icon={Clock} change="-2" changeType="positive" color="bg-orange-100 dark:bg-orange-900/30" />
                    <StatCard title="Attendance" value={stats.attendance} icon={CheckCircle} change="+2%" changeType="positive" color="bg-emerald-100 dark:bg-emerald-900/30" />
                    <StatCard title="Average Grade" value={stats.averageGrade} icon={Award} change="Top 10%" changeType="neutral" color="bg-violet-100 dark:bg-violet-900/30" />
                    <StatCard title="Credits Earned" value={stats.creditsEarned} icon={BookOpen} color="bg-blue-100 dark:bg-blue-900/30" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Assignments List */}
                    <Card className="lg:col-span-2 border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle>Your Assignments</CardTitle>
                            <CardDescription>Keep track of your upcoming deadlines</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="pending">Pending</TabsTrigger>
                                    <TabsTrigger value="submitted">Submitted</TabsTrigger>
                                </TabsList>

                                <TabsContent value="all" className="space-y-4">
                                    {mergedAssignments.length === 0 ? <p className="text-zinc-500 text-center py-4">No assignments found.</p> : mergedAssignments.map((assignment: any) => (
                                        <AssignmentCard key={assignment.id} assignment={assignment} onSelect={() => { setSelectedAssignment(assignment); setShowSubmitModal(true); }} />
                                    ))}
                                </TabsContent>
                                <TabsContent value="pending" className="space-y-4">
                                    {mergedAssignments.filter(a => a.status === 'pending').map((assignment: any) => (
                                        <AssignmentCard key={assignment.id} assignment={assignment} onSelect={() => { setSelectedAssignment(assignment); setShowSubmitModal(true); }} />
                                    ))}
                                </TabsContent>
                                <TabsContent value="submitted" className="space-y-4">
                                    {mergedAssignments.filter(a => a.status !== 'pending').map((assignment: any) => (
                                        <AssignmentCard key={assignment.id} assignment={assignment} onSelect={() => { setSelectedAssignment(assignment); setShowSubmitModal(true); }} />
                                    ))}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    {/* Recent Grades/Feedback */}
                    <div className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {demoMode ? (
                                        demoData.student.recentGrades.map((g, i) => (
                                            <div key={i} className="flex items-start gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
                                                <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full"><Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /></div>
                                                <div><p className="font-medium text-sm text-zinc-900 dark:text-white">{g.task} ({g.subject})</p><p className="text-xs text-zinc-500">Graded: {g.grade}</p></div>
                                                <span className="ml-auto text-xs text-zinc-400">{g.date}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-zinc-500 text-center">No recent activity</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Submission Modal */}
            {showSubmitModal && selectedAssignment && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Submit Assignment</h3>
                            <button onClick={() => setShowSubmitModal(false)}><X className="h-5 w-5 text-zinc-500" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-white">{selectedAssignment.title}</h4>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{selectedAssignment.description || "No description provided."}</p>
                            </div>

                            {selectedAssignment.status === 'graded' ? (
                                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800">
                                    <div className="flex items-center gap-2 mb-2"><Award className="h-5 w-5 text-emerald-600" /><span className="font-bold text-emerald-700 dark:text-emerald-400">Grade: {selectedAssignment.grade}/100</span></div>
                                    <p className="text-sm text-emerald-600 dark:text-emerald-300">"{selectedAssignment.feedback}"</p>
                                </div>
                            ) : selectedAssignment.status === 'submitted' ? (
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
                                    <CheckCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                    <p className="font-medium text-blue-700 dark:text-blue-300">Assignment Submitted</p>
                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Waiting for grading...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl p-8 text-center hover:border-violet-500 transition-colors cursor-pointer relative">
                                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)} />
                                        <Upload className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
                                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{selectedFile ? selectedFile.name : "Click to upload your PDF/DOCX"}</p>
                                    </div>
                                    <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white" disabled={!selectedFile || isSubmitting} onClick={handleSubmitAssignment}>
                                        {isSubmitting ? "Uploading..." : "Submit Assignment"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </PortalLayout>
    );
}

// Assignment Card Helper Component
const AssignmentCard = ({ assignment, onSelect }: { assignment: any, onSelect: () => void }) => (
    <div onClick={onSelect} className="group p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-md transition-all cursor-pointer flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${assignment.status === 'graded' ? 'bg-emerald-100 text-emerald-600' : assignment.status === 'submitted' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                {assignment.status === 'graded' ? <Award className="h-5 w-5" /> : assignment.status === 'submitted' ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
            </div>
            <div>
                <h4 className="font-semibold text-zinc-900 dark:text-white group-hover:text-violet-600 transition-colors">{assignment.title}</h4>
                <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                    <Badge variant="outline" className="text-xs font-normal">{assignment.subject || assignment.class_id}</Badge>
                    <span>• Due: {assignment.due_date || assignment.dueDate}</span>
                </div>
            </div>
        </div>
        <ChevronRight className="h-5 w-5 text-zinc-300 group-hover:text-violet-500 transition-colors" />
    </div>
);

export default StudentPortal;
