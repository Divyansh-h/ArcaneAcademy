import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Input } from "@/components/ui/input";
import { GraduationCap, BookOpen, FileText, Users, CheckCircle, Bell, Settings, LogOut, Plus, Edit, Eye, Upload, X } from "lucide-react";
import api from "@/lib/api";

import ReactDOM from "react-dom";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { demoData } from "@/lib/demoData";

const TeacherPortal = ({ demoMode = false }: { demoMode?: boolean }) => {
    const user = demoMode ? demoData.teacher.user : JSON.parse(localStorage.getItem('user') || '{}');
    const teacherName = user.name || "Teacher";
    const teacherData = { name: teacherName, department: "Computer Science" };

    // Data state
    const [assignments, setAssignments] = useState<any[]>([]);
    const [pendingSubmissions, setPendingSubmissions] = useState<any[]>([]);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Create assignment modal state
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [assignmentTitle, setAssignmentTitle] = useState("");
    const [assignmentDescription, setAssignmentDescription] = useState("");
    const [assignmentClass, setAssignmentClass] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Grading modal state
    const [showGradeModal, setShowGradeModal] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
    const [grade, setGrade] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isGrading, setIsGrading] = useState(false);

    const classes = [
        { id: "1", name: "Data Structures", code: "CS301", students: 45, assignments: 8, pendingGrading: 12 },
        { id: "2", name: "Algorithms", code: "CS302", students: 38, assignments: 6, pendingGrading: 5 },
        { id: "3", name: "Web Technologies", code: "CS304", students: 52, assignments: 10, pendingGrading: 18 },
        { id: "4", name: "Database Systems", code: "CS303", students: 40, assignments: 7, pendingGrading: 0 },
    ];

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch assignments created by this teacher
                const assignmentsRes = await api.get(`/grading/assignments?teacher_id=${user.id || ''}`);
                // Also fetch global/admin assignments
                const adminAssignmentsRes = await api.get(`/grading/assignments?class_id=ADMIN_UPLOAD`);

                let allAssignments = [];
                if (assignmentsRes.data.success) {
                    allAssignments = [...assignmentsRes.data.data];
                }
                if (adminAssignmentsRes.data.success) {
                    // Filter out duplicates if any (though unlikely unless teacher is admin)
                    const adminAss = adminAssignmentsRes.data.data.filter((a: any) => !allAssignments.find(existing => existing.id === a.id));
                    allAssignments = [...allAssignments, ...adminAss];
                }
                setAssignments(allAssignments);

                // Fetch pending submissions (all possible for now)
                const pendingRes = await api.get('/grading/submissions/pending');
                if (pendingRes.data.success) {
                    // Enrich submission data if possible (e.g. resolve names) - API returns UUIDs
                    // For demo sync, we might just display IDs or hardcoded names if user service lookup isn't ready
                    // But we will use the data we have.
                    const submissions = pendingRes.data.data.map((s: any) => ({
                        ...s,
                        studentName: "Student " + (s.student_id ? s.student_id.slice(0, 4) : "Unknown"),
                        submittedAt: new Date().toLocaleDateString(), // Mock date if API doesn't return
                        assignment: allAssignments.find((a: any) => a.id === s.assignment_id)?.title || "Unknown Assignment"
                    }));
                    setPendingSubmissions(submissions);
                }

                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setLoading(false);
            }
        };

        if (user.id) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [user.id, showCreateModal, showGradeModal]); // Refresh when modals close

    const handleCreateAssignment = async () => {
        if (!assignmentTitle || !assignmentClass) {
            setUploadMessage("Please fill in title and select a class");
            return;
        }

        setIsUploading(true);
        setUploadMessage("");

        try {
            const formData = new FormData();
            formData.append('title', assignmentTitle);
            formData.append('description', assignmentDescription);
            formData.append('class_id', assignmentClass);
            formData.append('teacher_id', user.id || '');

            if (selectedFile) {
                formData.append('file', selectedFile);
            }

            const response = await api.post('/grading/assignments', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setUploadMessage("✅ Assignment created successfully!");
                setAssignmentTitle("");
                setAssignmentDescription("");
                setAssignmentClass("");
                setSelectedFile(null);
                setTimeout(() => {
                    setShowCreateModal(false);
                    setUploadMessage("");
                }, 1500);
            } else {
                setUploadMessage("❌ Failed to create assignment");
            }
        } catch (error: any) {
            console.error('Create assignment error:', error);
            setUploadMessage(`❌ Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleGradeSubmission = async () => {
        if (!selectedSubmission || !grade) return;

        setIsGrading(true);
        try {
            const formData = new FormData();
            formData.append('grade', grade);
            formData.append('feedback', feedback);

            await api.post(`/grading/submissions/${selectedSubmission.id}/grade`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' } // grading endpoint expects form data or json
            });

            setShowGradeModal(false);
            setGrade("");
            setFeedback("");
            alert("✅ Grade submitted successfully!");
        } catch (error) {
            console.error("Grading failed:", error);
            alert("Failed to submit grade");
        } finally {
            setIsGrading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // ... parts of the function remain the same ...

    // UI Helpers
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

    const totalPendingGrading = pendingSubmissions.filter(s => s.status === 'pending').length;
    // Mock simple stats based on loaded data
    const totalStudents = classes.reduce((sum, c) => sum + c.students, 0);

    // Modal Components
    const StatCard = ({ title, value, icon: Icon, description }: { title: string; value: string | number; icon: React.ElementType; description: string }) => (
        <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4"><div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800"><Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" /></div></div>
                <div className="space-y-1"><p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p><p className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</p><p className="text-xs text-zinc-400 dark:text-zinc-500">{description}</p></div>
            </CardContent>
        </Card>
    );

    const CreateAssignmentModal = ({ showCreateModal, setShowCreateModal, assignmentTitle, setAssignmentTitle, assignmentDescription, setAssignmentDescription, assignmentClass, setAssignmentClass, classes, selectedFile, handleFileSelect, fileInputRef, uploadMessage, handleCreateAssignment, isUploading }: any) => {
        if (!showCreateModal) return null;
        return ReactDOM.createPortal(
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-lg relative">
                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between"><h2 className="text-xl font-bold text-zinc-900 dark:text-white">Create New Assignment</h2><button onClick={() => setShowCreateModal(false)}><X className="h-5 w-5 text-zinc-500" /></button></div>
                    <div className="p-6 space-y-4">
                        <Input placeholder="Assignment Title *" value={assignmentTitle} onChange={(e) => setAssignmentTitle(e.target.value)} />
                        <textarea className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800" rows={3} placeholder="Description" value={assignmentDescription} onChange={(e) => setAssignmentDescription(e.target.value)} />
                        <select className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800" value={assignmentClass} onChange={(e) => setAssignmentClass(e.target.value)}>
                            <option value="">Select a class *</option>
                            {classes.map((c: any) => (<option key={c.code} value={c.code}>{c.name}</option>))}
                        </select>
                        <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
                            {selectedFile ? <span className="text-emerald-500">{selectedFile.name}</span> : <span>Upload Question Paper (PDF)</span>}
                        </div>
                        {uploadMessage && <p className="text-sm text-center font-medium">{uploadMessage}</p>}
                    </div>
                    <div className="p-6 border-t flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                        <Button onClick={handleCreateAssignment} disabled={isUploading}>{isUploading ? "Creating..." : "Create Assignment"}</Button>
                    </div>
                </motion.div>
            </div>,
            document.body
        );
    };

    const GradeSubmissionModal = ({ showGradeModal, setShowGradeModal, selectedSubmission, grade, setGrade, feedback, setFeedback, handleGradeSubmission, isGrading }: any) => {
        if (!showGradeModal) return null;
        return ReactDOM.createPortal(
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md relative">
                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between"><h2 className="text-xl font-bold text-zinc-900 dark:text-white">Grade Submission</h2><button onClick={() => setShowGradeModal(false)}><X className="h-5 w-5 text-zinc-500" /></button></div>
                    <div className="p-6 space-y-4">
                        <div><label className="text-sm font-medium">Student</label><p>{selectedSubmission?.studentName}</p></div>
                        <div><label className="text-sm font-medium">Assignment</label><p>{selectedSubmission?.assignment}</p></div>
                        <Separator />
                        <div><label className="text-sm font-medium">Grade (e.g. A, 95)</label><Input value={grade} onChange={(e) => setGrade(e.target.value)} /></div>
                        <div><label className="text-sm font-medium">Feedback</label><textarea className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800" rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)} /></div>
                    </div>
                    <div className="p-6 border-t flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setShowGradeModal(false)}>Cancel</Button>
                        <Button onClick={handleGradeSubmission} disabled={isGrading}>{isGrading ? "Submitting..." : "Submit Grade"}</Button>
                    </div>
                </motion.div>
            </div>,
            document.body
        );
    };

    return (
        <PortalLayout userType="teacher" userName={teacherData.name} demoMode={demoMode}>
            <CreateAssignmentModal
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
                assignmentTitle={assignmentTitle}
                setAssignmentTitle={setAssignmentTitle}
                assignmentDescription={assignmentDescription}
                setAssignmentDescription={setAssignmentDescription}
                assignmentClass={assignmentClass}
                setAssignmentClass={setAssignmentClass}
                classes={classes}
                selectedFile={selectedFile}
                handleFileSelect={handleFileSelect}
                fileInputRef={fileInputRef}
                uploadMessage={uploadMessage}
                handleCreateAssignment={handleCreateAssignment}
                isUploading={isUploading}
            />
            <GradeSubmissionModal
                showGradeModal={showGradeModal}
                setShowGradeModal={setShowGradeModal}
                selectedSubmission={selectedSubmission}
                grade={grade}
                setGrade={setGrade}
                feedback={feedback}
                setFeedback={setFeedback}
                handleGradeSubmission={handleGradeSubmission}
                isGrading={isGrading}
            />

            <div className="space-y-6">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                        <div><h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Welcome, {teacherData.name.split(" ")[0]}! 👩‍🏫</h1><p className="text-zinc-600 dark:text-zinc-400">You have {totalPendingGrading} submissions waiting to be graded</p></div>
                        <Button size="lg" onClick={() => setShowCreateModal(true)}><Plus className="h-4 w-4 mr-2" />Create Assignment</Button>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="classes">My Classes</TabsTrigger><TabsTrigger value="grading">Grading Queue</TabsTrigger><TabsTrigger value="assignments">Assignments</TabsTrigger></TabsList>
                            <TabsContent value="overview">
                                <Card className="border-0 shadow-lg mb-6">
                                    <CardHeader><CardTitle>Pending Submissions</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        {pendingSubmissions.length === 0 ? <p className="text-zinc-500">No pending submissions.</p> : pendingSubmissions.map((submission) => (
                                            <div key={submission.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex justify-between items-center">
                                                <div><h4 className="font-medium text-zinc-900 dark:text-white">{submission.studentName}</h4><p className="text-sm text-zinc-500">{submission.assignment}</p></div>
                                                <Button size="sm" onClick={() => { setSelectedSubmission(submission); setShowGradeModal(true); }}>Grade</Button>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="assignments">
                                <Card className="border-0 shadow-lg">
                                    <CardHeader><div className="flex justify-between items-center"><CardTitle>Your Assignments</CardTitle><Button size="sm" onClick={() => setShowCreateModal(true)}><Plus className="h-4 w-4 mr-1" /> New</Button></div></CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {assignments.length === 0 ? <p className="text-zinc-500 text-center py-8">No assignments created yet.</p> : assignments.map(a => (
                                                <div key={a.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800">
                                                    <h4 className="font-medium">{a.title}</h4>
                                                    <p className="text-sm text-zinc-500">{a.class_id} - {a.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="grading">
                                <Card className="border-0 shadow-lg">
                                    <CardHeader><CardTitle>Grading Queue</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        {pendingSubmissions.length === 0 ? <p className="text-zinc-500">Queue empty.</p> : pendingSubmissions.map((submission) => (
                                            <div key={submission.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex justify-between items-center">
                                                <div><h4 className="font-medium text-zinc-900 dark:text-white">{submission.studentName}</h4><p className="text-sm text-zinc-500">{submission.assignment}</p></div>
                                                <Button size="sm" onClick={() => { setSelectedSubmission(submission); setShowGradeModal(true); }}>Grade Now</Button>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="classes">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {classes.map((classItem) => (
                                        <Card key={classItem.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4"><div><h3 className="font-semibold text-lg text-zinc-900 dark:text-white">{classItem.name}</h3><p className="text-sm text-zinc-500 dark:text-zinc-400">{classItem.code}</p></div>{classItem.pendingGrading > 0 && <Badge variant="warning">{classItem.pendingGrading} pending</Badge>}</div>
                                                <Separator className="my-4" />
                                                <div className="mt-4 flex gap-2"><Button variant="outline" size="sm" className="flex-1"><Eye className="h-4 w-4 mr-1" />View</Button><Button size="sm" className="flex-1" onClick={() => { setAssignmentClass(classItem.code); setShowCreateModal(true); }}><Plus className="h-4 w-4 mr-1" />Assignment</Button></div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </motion.div>
            </div>
        </PortalLayout>
    );
};

export default TeacherPortal;
