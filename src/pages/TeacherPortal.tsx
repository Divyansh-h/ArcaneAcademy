import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GraduationCap, BookOpen, FileText, Users, CheckCircle, Bell, Settings, LogOut, Plus, Edit, Eye } from "lucide-react";

const TeacherPortal = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const teacherName = user.name || "Dr. Sarah Mitchell";
    const teacherData = { name: teacherName, department: "Computer Science" };
    const classes = [
        { id: "1", name: "Data Structures", code: "CS301", students: 45, assignments: 8, pendingGrading: 12 },
        { id: "2", name: "Algorithms", code: "CS302", students: 38, assignments: 6, pendingGrading: 5 },
        { id: "3", name: "Web Technologies", code: "CS304", students: 52, assignments: 10, pendingGrading: 18 },
        { id: "4", name: "Database Systems", code: "CS303", students: 40, assignments: 7, pendingGrading: 0 },
    ];
    const pendingSubmissions = [
        { id: "1", studentName: "Alex Johnson", assignment: "Data Structures Assignment 3", subject: "Data Structures", submittedAt: "Dec 30, 2024" },
        { id: "2", studentName: "Emily Carter", assignment: "Algorithm Analysis Report", subject: "Algorithms", submittedAt: "Dec 29, 2024" },
        { id: "3", studentName: "Michael Brown", assignment: "Web Portfolio Project", subject: "Web Technologies", submittedAt: "Dec 28, 2024" },
        { id: "4", studentName: "Jessica Lee", assignment: "Data Structures Assignment 3", subject: "Data Structures", submittedAt: "Dec 30, 2024" },
    ];
    const recentActivity = [
        { id: "1", action: "Graded Algorithm Analysis Report for John Smith", time: "2 hours ago" },
        { id: "2", action: "Created new assignment in Data Structures", time: "5 hours ago" },
        { id: "3", action: "Updated syllabus for Web Technologies", time: "1 day ago" },
    ];

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

    const totalPendingGrading = classes.reduce((sum, c) => sum + c.pendingGrading, 0);
    const totalStudents = classes.reduce((sum, c) => sum + c.students, 0);

    const StatCard = ({ title, value, icon: Icon, description }: { title: string; value: string | number; icon: React.ElementType; description: string }) => (
        <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4"><div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800"><Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" /></div></div>
                <div className="space-y-1"><p className="text-sm text-zinc-500 dark:text-zinc-400">{title}</p><p className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</p><p className="text-xs text-zinc-400 dark:text-zinc-500">{description}</p></div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 transition-transform group-hover:scale-105"><GraduationCap className="h-5 w-5" /></div>
                                <span className="text-xl font-bold text-zinc-900 dark:text-white">Arcane<span className="text-zinc-500 dark:text-zinc-400">Academy</span></span>
                            </Link>
                            <Badge variant="success" className="hidden sm:flex">Teacher Portal</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <button className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                                {totalPendingGrading > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">{totalPendingGrading > 9 ? "9+" : totalPendingGrading}</span>}
                            </button>
                            <button className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"><Settings className="h-5 w-5 text-zinc-600 dark:text-zinc-400" /></button>
                            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-700">
                                <Avatar><AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">SM</AvatarFallback></Avatar>
                                <div className="hidden md:block"><p className="text-sm font-medium text-zinc-900 dark:text-white">{teacherData.name}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">{teacherData.department}</p></div>
                            </div>
                            <Link to="/login"><Button variant="ghost" size="sm"><LogOut className="h-4 w-4" /></Button></Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                        <div><h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Welcome, {teacherData.name.split(" ")[1]}! 👩‍🏫</h1><p className="text-zinc-600 dark:text-zinc-400">You have {totalPendingGrading} submissions waiting to be graded</p></div>
                        <Button size="lg"><Plus className="h-4 w-4 mr-2" />Create Assignment</Button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard title="Total Students" value={totalStudents} icon={Users} description="Across all classes" />
                        <StatCard title="Classes" value={classes.length} icon={BookOpen} description="Active this semester" />
                        <StatCard title="Pending Grading" value={totalPendingGrading} icon={FileText} description="Submissions to review" />
                        <StatCard title="This Week" value="12" icon={CheckCircle} description="Submissions graded" />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="classes">My Classes</TabsTrigger><TabsTrigger value="grading">Grading Queue</TabsTrigger><TabsTrigger value="assignments">Assignments</TabsTrigger></TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                <div className="grid lg:grid-cols-3 gap-6">
                                    <Card className="lg:col-span-2 border-0 shadow-lg">
                                        <CardHeader className="pb-4"><div className="flex items-center justify-between"><CardTitle className="text-lg">Pending Submissions</CardTitle><Badge variant="secondary">{pendingSubmissions.length} new</Badge></div></CardHeader>
                                        <CardContent className="space-y-4">
                                            {pendingSubmissions.map((submission) => (
                                                <div key={submission.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center justify-between">
                                                    <div className="flex items-center gap-4"><Avatar className="h-10 w-10"><AvatarFallback className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm">{submission.studentName.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar><div><h4 className="font-medium text-zinc-900 dark:text-white">{submission.studentName}</h4><p className="text-sm text-zinc-500 dark:text-zinc-400">{submission.assignment}</p></div></div>
                                                    <div className="flex items-center gap-3"><Badge variant="outline" className="text-xs">{submission.submittedAt}</Badge><Button size="sm" variant="default"><Edit className="h-4 w-4 mr-1" />Grade</Button></div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader className="pb-4"><CardTitle className="text-lg">Recent Activity</CardTitle></CardHeader>
                                        <CardContent className="space-y-4">{recentActivity.map((activity) => (<div key={activity.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800"><p className="text-sm text-zinc-900 dark:text-white">{activity.action}</p><p className="text-xs text-zinc-400 mt-1">{activity.time}</p></div>))}</CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="classes">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {classes.map((classItem) => (
                                        <Card key={classItem.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4"><div><h3 className="font-semibold text-lg text-zinc-900 dark:text-white">{classItem.name}</h3><p className="text-sm text-zinc-500 dark:text-zinc-400">{classItem.code}</p></div>{classItem.pendingGrading > 0 && <Badge variant="warning">{classItem.pendingGrading} pending</Badge>}</div>
                                                <Separator className="my-4" />
                                                <div className="grid grid-cols-3 gap-4 text-center"><div><p className="text-lg font-bold text-zinc-900 dark:text-white">{classItem.students}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">Students</p></div><div><p className="text-lg font-bold text-zinc-900 dark:text-white">{classItem.assignments}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">Assignments</p></div><div><p className="text-lg font-bold text-zinc-900 dark:text-white">{classItem.pendingGrading}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">To Grade</p></div></div>
                                                <div className="mt-4 flex gap-2"><Button variant="outline" size="sm" className="flex-1"><Eye className="h-4 w-4 mr-1" />View</Button><Button size="sm" className="flex-1"><Plus className="h-4 w-4 mr-1" />Assignment</Button></div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="grading">
                                <Card className="border-0 shadow-lg">
                                    <CardHeader><div className="flex items-center justify-between"><div><CardTitle>Grading Queue</CardTitle><CardDescription>{totalPendingGrading} submissions waiting for your review</CardDescription></div><Button>Start Grading</Button></div></CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {pendingSubmissions.map((submission, index) => (
                                                <div key={submission.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center justify-between">
                                                    <div className="flex items-center gap-4"><div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-medium text-zinc-600 dark:text-zinc-300">{index + 1}</div><div><h4 className="font-medium text-zinc-900 dark:text-white">{submission.assignment}</h4><p className="text-sm text-zinc-500 dark:text-zinc-400">{submission.studentName} • {submission.subject}</p></div></div>
                                                    <div className="flex items-center gap-3"><p className="text-sm text-zinc-500 dark:text-zinc-400">{submission.submittedAt}</p><Button size="sm">Grade Now</Button></div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="assignments">
                                <Card className="border-0 shadow-lg">
                                    <CardHeader><div className="flex items-center justify-between"><div><CardTitle>All Assignments</CardTitle><CardDescription>Manage assignments across all your classes</CardDescription></div><Button><Plus className="h-4 w-4 mr-2" />New Assignment</Button></div></CardHeader>
                                    <CardContent><p className="text-zinc-500 dark:text-zinc-400 text-center py-8">Assignment management interface coming soon...</p></CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
};

export default TeacherPortal;
