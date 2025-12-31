import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BookOpen, FileText, Award, Clock, CheckCircle, AlertCircle, Calendar, ChevronRight, BarChart3 } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { PortalLayout } from "@/components/layout/PortalLayout";

const StudentPortal = () => {
    // Get user from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const studentName = user.name || "Student";
    const studentEmail = user.email || "student@university.edu";

    const studentData = { name: studentName, email: studentEmail, batch: "Computer Science 2024", semester: "Fall 2024", cgpa: 8.7 };
    const assignments = [
        { id: "1", title: "Data Structures Assignment 3", subject: "Data Structures", dueDate: "Jan 5, 2025", status: "pending", progress: 45 },
        { id: "2", title: "Database Design Project", subject: "Database Systems", dueDate: "Jan 8, 2025", status: "pending", progress: 20 },
        { id: "3", title: "Algorithm Analysis Report", subject: "Algorithms", dueDate: "Dec 28, 2024", status: "submitted", grade: "A" },
        { id: "4", title: "Web Development Portfolio", subject: "Web Technologies", dueDate: "Dec 20, 2024", status: "graded", grade: "A+" },
    ];
    const subjects = [
        { name: "Data Structures", code: "CS301", grade: "A", credits: 4 },
        { name: "Algorithms", code: "CS302", grade: "A-", credits: 4 },
        { name: "Database Systems", code: "CS303", grade: "B+", credits: 3 },
        { name: "Web Technologies", code: "CS304", grade: "A+", credits: 3 },
        { name: "Computer Networks", code: "CS305", grade: "A", credits: 3 },
    ];
    const notifications = [
        { id: "1", message: "New assignment posted in Data Structures", time: "2 hours ago", read: false },
        { id: "2", message: "Your Algorithm Analysis Report has been graded", time: "1 day ago", read: false },
        { id: "3", message: "Reminder: Database Project due in 3 days", time: "2 days ago", read: true },
    ];

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };


    return (
        <PortalLayout portalName="Student Portal" userName={studentData.name} userBatch={studentData.batch}>
            <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                <motion.div variants={itemVariants} className="mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900 mb-2">Welcome back, {studentData.name.split(" ")[0]}! 👋</h1>
                    <p className="text-zinc-600">Here's an overview of your academic progress for {studentData.semester}</p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard title="Current CGPA" value={studentData.cgpa} icon={Award} description="Out of 10.0" trend="+0.3" />
                    <StatCard title="Assignments" value={`${assignments.filter(a => a.status === "graded").length}/${assignments.length}`} icon={FileText} description="Completed this semester" />
                    <StatCard title="Subjects" value={subjects.length} icon={BookOpen} description="Currently enrolled" />
                    <StatCard title="Attendance" value="92%" icon={Calendar} description="This semester" trend="+2%" />
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Tabs defaultValue="overview" className="space-y-6">
                        <TabsList className="bg-white border border-zinc-200 p-1">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="assignments">Assignments</TabsTrigger>
                            <TabsTrigger value="subjects">Subjects</TabsTrigger>
                            <TabsTrigger value="grades">Grades</TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            <div className="grid lg:grid-cols-3 gap-6">
                                <Card className="lg:col-span-2 border-0 shadow-lg">
                                    <CardHeader className="pb-4"><div className="flex items-center justify-between"><CardTitle className="text-lg">Pending Assignments</CardTitle><Button variant="ghost" size="sm">View All <ChevronRight className="h-4 w-4 ml-1" /></Button></div></CardHeader>
                                    <CardContent className="space-y-4">
                                        {assignments.filter((a) => a.status === "pending").map((assignment) => (
                                            <div key={assignment.id} className="p-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div><h4 className="font-medium text-zinc-900">{assignment.title}</h4><p className="text-sm text-zinc-500">{assignment.subject}</p></div>
                                                    <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />{assignment.dueDate}</Badge>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm"><span className="text-zinc-500">Progress</span><span className="font-medium text-zinc-900">{assignment.progress}%</span></div>
                                                    <Progress value={assignment.progress} className="h-2" />
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                                <Card className="border-0 shadow-lg">
                                    <CardHeader className="pb-4"><CardTitle className="text-lg">Notifications</CardTitle></CardHeader>
                                    <CardContent className="space-y-4">
                                        {notifications.map((notification) => (
                                            <div key={notification.id} className={`p-4 rounded-xl transition-colors ${notification.read ? "bg-zinc-50" : "bg-blue-50 border border-blue-100"}`}>
                                                <p className={`text-sm ${notification.read ? "text-zinc-600" : "text-zinc-900 font-medium"}`}>{notification.message}</p>
                                                <p className="text-xs text-zinc-400 mt-1">{notification.time}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                            <Card className="border-0 shadow-lg">
                                <CardHeader className="pb-4"><div className="flex items-center justify-between"><CardTitle className="text-lg">Recent Grades</CardTitle><Badge variant="secondary"><BarChart3 className="h-3 w-3 mr-1" />Grade Analytics</Badge></div></CardHeader>

                                <TabsContent value="assignments">
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader><CardTitle>All Assignments</CardTitle><CardDescription>View and manage your assignments across all subjects</CardDescription></CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {assignments.map((assignment) => (
                                                    <div key={assignment.id} className="p-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors flex items-center justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`p-2 rounded-lg ${assignment.status === "graded" ? "bg-emerald-100" : assignment.status === "submitted" ? "bg-blue-100" : "bg-amber-100"}`}>
                                                                {assignment.status === "graded" ? <CheckCircle className="h-5 w-5 text-emerald-600" /> : assignment.status === "submitted" ? <Clock className="h-5 w-5 text-blue-600" /> : <AlertCircle className="h-5 w-5 text-amber-600" />}
                                                            </div>
                                                            <div><h4 className="font-medium text-zinc-900">{assignment.title}</h4><p className="text-sm text-zinc-500">{assignment.subject} • Due: {assignment.dueDate}</p></div>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            {assignment.grade && <Badge variant="success">{assignment.grade}</Badge>}
                                                            {assignment.status === "pending" && <Button size="sm">Submit</Button>}
                                                            <Button variant="ghost" size="sm"><ChevronRight className="h-4 w-4" /></Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="subjects">
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {subjects.map((subject) => (
                                            <Card key={subject.code} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                                <CardContent className="p-6">
                                                    <div className="flex items-start justify-between mb-4"><div className="p-3 bg-zinc-100 rounded-xl"><BookOpen className="h-5 w-5 text-zinc-700" /></div><Badge variant="outline">{subject.credits} Credits</Badge></div>
                                                    <h3 className="font-semibold text-lg text-zinc-900 mb-1">{subject.name}</h3>
                                                    <p className="text-sm text-zinc-500 mb-4">{subject.code}</p>
                                                    <Separator className="my-4" />
                                                    <div className="flex items-center justify-between"><span className="text-sm text-zinc-500">Current Grade</span><span className="text-2xl font-bold text-zinc-900">{subject.grade}</span></div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="grades">
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <div><CardTitle>Grade Summary</CardTitle><CardDescription>Your academic performance for {studentData.semester}</CardDescription></div>
                                                <div className="text-right"><p className="text-sm text-zinc-500">Current CGPA</p><p className="text-3xl font-bold text-zinc-900">{studentData.cgpa}</p></div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead><tr className="border-b border-zinc-200"><th className="text-left py-3 px-4 text-sm font-medium text-zinc-500">Subject</th><th className="text-left py-3 px-4 text-sm font-medium text-zinc-500">Code</th><th className="text-center py-3 px-4 text-sm font-medium text-zinc-500">Credits</th><th className="text-center py-3 px-4 text-sm font-medium text-zinc-500">Grade</th><th className="text-center py-3 px-4 text-sm font-medium text-zinc-500">Grade Points</th></tr></thead>
                                                    <tbody>
                                                        {subjects.map((subject) => (
                                                            <tr key={subject.code} className="border-b border-zinc-100 hover:bg-zinc-50">
                                                                <td className="py-4 px-4 font-medium text-zinc-900">{subject.name}</td>
                                                                <td className="py-4 px-4 text-zinc-600">{subject.code}</td>
                                                                <td className="py-4 px-4 text-center text-zinc-600">{subject.credits}</td>
                                                                <td className="py-4 px-4 text-center"><Badge variant="outline">{subject.grade}</Badge></td>
                                                                <td className="py-4 px-4 text-center font-medium text-zinc-900">{subject.grade === "A+" ? 10 : subject.grade === "A" ? 9 : subject.grade === "A-" ? 8.5 : 8}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                </motion.div>
        </PortalLayout>
    );
}

export default StudentPortal;
