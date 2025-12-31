import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GraduationCap, BookOpen, Users, Building, TrendingUp, Bell, Settings, LogOut, Plus, Search, MoreHorizontal, UserPlus, BookPlus, Shield, BarChart3, Calendar, Download, Filter } from "lucide-react";
import { useState } from "react";
import { AssignmentUpload } from "@/components/AssignmentUpload";

const AdminPortal = () => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const adminName = user.name || "John Administrator";
    const adminData = { name: adminName, role: "Super Admin" };
    const stats = { totalStudents: 1250, totalTeachers: 85, totalSubjects: 48, totalBatches: 12, activeAssignments: 156, pendingGrading: 342 };
    const recentUsers = [
        { id: "1", name: "Alex Johnson", email: "alex@uni.edu", role: "Student", joinedAt: "Dec 30, 2024" },
        { id: "2", name: "Dr. Sarah Mitchell", email: "sarah.m@uni.edu", role: "Teacher", joinedAt: "Dec 28, 2024" },
        { id: "3", name: "Emily Carter", email: "emily@uni.edu", role: "Student", joinedAt: "Dec 27, 2024" },
        { id: "4", name: "Prof. James Wilson", email: "james.w@uni.edu", role: "Teacher", joinedAt: "Dec 25, 2024" },
    ];
    const batches = [
        { id: "1", name: "Computer Science 2024", code: "CS-2024", students: 120, subjects: 8 },
        { id: "2", name: "Computer Science 2025", code: "CS-2025", students: 115, subjects: 6 },
        { id: "3", name: "Information Technology 2024", code: "IT-2024", students: 95, subjects: 7 },
        { id: "4", name: "Data Science 2024", code: "DS-2024", students: 80, subjects: 9 },
    ];
    const subjects = [
        { id: "1", name: "Data Structures", code: "CS301", teachers: 3, batches: 2 },
        { id: "2", name: "Algorithms", code: "CS302", teachers: 2, batches: 2 },
        { id: "3", name: "Database Systems", code: "CS303", teachers: 2, batches: 3 },
        { id: "4", name: "Web Technologies", code: "CS304", teachers: 4, batches: 2 },
        { id: "5", name: "Machine Learning", code: "CS401", teachers: 2, batches: 1 },
    ];

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

    const StatCard = ({ title, value, icon: Icon, change, color = "bg-zinc-100 dark:bg-zinc-800" }: { title: string; value: number | string; icon: React.ElementType; change?: string; color?: string }) => (
        <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
                <div className="flex items-center justify-between"><div className={`p-3 rounded-xl ${color}`}><Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" /></div>{change && <Badge variant="success" className="text-xs"><TrendingUp className="h-3 w-3 mr-1" />{change}</Badge>}</div>
                <div className="mt-4"><p className="text-3xl font-bold text-zinc-900 dark:text-white">{value}</p><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{title}</p></div>
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
                            <Badge className="bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-300 border-violet-200 dark:border-violet-700 hidden sm:flex"><Shield className="h-3 w-3 mr-1" />Admin Portal</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" /><Input type="search" placeholder="Search users, subjects..." className="pl-10 w-64" /></div>
                            <ThemeToggle />
                            <button className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"><Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-400" /><span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" /></button>
                            <button className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"><Settings className="h-5 w-5 text-zinc-600 dark:text-zinc-400" /></button>
                            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-700">
                                <Avatar><AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">JA</AvatarFallback></Avatar>
                                <div className="hidden md:block"><p className="text-sm font-medium text-zinc-900 dark:text-white">{adminData.name}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">{adminData.role}</p></div>
                            </div>
                            <Link to="/login"><Button variant="ghost" size="sm"><LogOut className="h-4 w-4" /></Button></Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                    <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                        <div><h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Admin Dashboard 🛡️</h1><p className="text-zinc-600 dark:text-zinc-400">Manage your institution's users, courses, and settings</p></div>
                        <div className="flex gap-3"><Button variant="outline"><Download className="h-4 w-4 mr-2" />Export Report</Button><Button onClick={() => setIsUploadOpen(true)} className="bg-emerald-600 hover:bg-emerald-700"><Plus className="h-4 w-4 mr-2" />Upload Question Paper</Button><Button><Plus className="h-4 w-4 mr-2" />Quick Actions</Button></div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                        <StatCard title="Total Students" value={stats.totalStudents} icon={Users} change="+12%" color="bg-blue-100 dark:bg-blue-900/30" />
                        <StatCard title="Total Teachers" value={stats.totalTeachers} icon={BookOpen} change="+5%" color="bg-emerald-100 dark:bg-emerald-900/30" />
                        <StatCard title="Subjects" value={stats.totalSubjects} icon={BookPlus} color="bg-amber-100 dark:bg-amber-900/30" />
                        <StatCard title="Batches" value={stats.totalBatches} icon={Building} color="bg-violet-100 dark:bg-violet-900/30" />
                        <StatCard title="Active Assignments" value={stats.activeAssignments} icon={Calendar} color="bg-rose-100 dark:bg-rose-900/30" />
                        <StatCard title="Pending Grading" value={stats.pendingGrading} icon={BarChart3} color="bg-orange-100 dark:bg-orange-900/30" />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Tabs defaultValue="overview" className="space-y-6">
                            <TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="users">Users</TabsTrigger><TabsTrigger value="batches">Batches</TabsTrigger><TabsTrigger value="subjects">Subjects</TabsTrigger></TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                <div className="grid lg:grid-cols-2 gap-6">
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader className="pb-4"><div className="flex items-center justify-between"><CardTitle className="text-lg">Recent Users</CardTitle><Button variant="ghost" size="sm">View All</Button></div></CardHeader>
                                        <CardContent className="space-y-4">
                                            {recentUsers.map((user) => (
                                                <div key={user.id} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                                                    <div className="flex items-center gap-3"><Avatar className="h-10 w-10"><AvatarFallback className={user.role === "Teacher" ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300" : "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"}>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar><div><p className="font-medium text-zinc-900 dark:text-white text-sm">{user.name}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p></div></div>
                                                    <div className="text-right"><Badge variant={user.role === "Teacher" ? "success" : "secondary"} className="text-xs">{user.role}</Badge><p className="text-xs text-zinc-400 mt-1">{user.joinedAt}</p></div>
                                                </div>
                                            ))}
                                        </CardContent>
                                    </Card>
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader className="pb-4"><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
                                        <CardContent className="grid grid-cols-2 gap-4">
                                            {[{ icon: UserPlus, label: "Add Student", color: "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40" }, { icon: Users, label: "Add Teacher", color: "bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/40" }, { icon: BookPlus, label: "Create Subject", color: "bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/40" }, { icon: Building, label: "New Batch", color: "bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 dark:hover:bg-violet-900/40" }, { icon: Download, label: "Export Data", color: "bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700" }, { icon: Settings, label: "Settings", color: "bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700" }].map((action, index) => (<button key={index} className={`p-4 rounded-xl ${action.color} transition-colors text-left`}><action.icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300 mb-2" /><p className="font-medium text-sm text-zinc-900 dark:text-white">{action.label}</p></button>))}
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="users">
                                <Card className="border-0 shadow-lg">
                                    <CardHeader><div className="flex items-center justify-between"><div><CardTitle>User Management</CardTitle><CardDescription>Manage students, teachers, and administrators</CardDescription></div><div className="flex gap-3"><Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button><Button><UserPlus className="h-4 w-4 mr-2" />Add User</Button></div></div></CardHeader>
                                    <CardContent>
                                        <div className="overflow-x-auto">
                                            <table className="w-full">
                                                <thead><tr className="border-b border-zinc-200 dark:border-zinc-700"><th className="text-left py-3 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">User</th><th className="text-left py-3 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">Email</th><th className="text-left py-3 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">Role</th><th className="text-left py-3 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">Joined</th><th className="text-right py-3 px-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">Actions</th></tr></thead>
                                                <tbody>
                                                    {recentUsers.map((user) => (<tr key={user.id} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"><td className="py-4 px-4"><div className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback></Avatar><span className="font-medium text-zinc-900 dark:text-white">{user.name}</span></div></td><td className="py-4 px-4 text-zinc-600 dark:text-zinc-400">{user.email}</td><td className="py-4 px-4"><Badge variant={user.role === "Teacher" ? "success" : "secondary"}>{user.role}</Badge></td><td className="py-4 px-4 text-zinc-600 dark:text-zinc-400">{user.joinedAt}</td><td className="py-4 px-4 text-right"><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></td></tr>))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="batches">
                                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {batches.map((batch) => (
                                        <Card key={batch.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                                            <CardContent className="p-6">
                                                <div className="flex items-start justify-between mb-4"><div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl"><Building className="h-5 w-5 text-violet-700 dark:text-violet-400" /></div><Badge variant="outline">{batch.code}</Badge></div>
                                                <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">{batch.name}</h3>
                                                <Separator className="my-4" />
                                                <div className="grid grid-cols-2 gap-4 text-center"><div><p className="text-lg font-bold text-zinc-900 dark:text-white">{batch.students}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">Students</p></div><div><p className="text-lg font-bold text-zinc-900 dark:text-white">{batch.subjects}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">Subjects</p></div></div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="subjects">
                                <Card className="border-0 shadow-lg">
                                    <CardHeader><div className="flex items-center justify-between"><div><CardTitle>Subject Management</CardTitle><CardDescription>Configure subjects and assign teachers</CardDescription></div><Button><BookPlus className="h-4 w-4 mr-2" />Add Subject</Button></div></CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {subjects.map((subject) => (
                                                <div key={subject.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors flex items-center justify-between">
                                                    <div className="flex items-center gap-4"><div className="p-2 bg-white dark:bg-zinc-700 rounded-lg shadow-sm"><BookOpen className="h-5 w-5 text-zinc-600 dark:text-zinc-300" /></div><div><h4 className="font-medium text-zinc-900 dark:text-white">{subject.name}</h4><p className="text-sm text-zinc-500 dark:text-zinc-400">{subject.code}</p></div></div>
                                                    <div className="flex items-center gap-6"><div className="text-center"><p className="font-medium text-zinc-900 dark:text-white">{subject.teachers}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">Teachers</p></div><div className="text-center"><p className="font-medium text-zinc-900 dark:text-white">{subject.batches}</p><p className="text-xs text-zinc-500 dark:text-zinc-400">Batches</p></div><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </motion.div>
                </motion.div>
            </main>

            <AssignmentUpload open={isUploadOpen} onOpenChange={setIsUploadOpen} classId="ADMIN_UPLOAD" />
        </div>
    );
}

export default AdminPortal;
