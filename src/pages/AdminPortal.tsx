import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GraduationCap, BookOpen, Users, Building, TrendingUp, LogOut, Plus, UserPlus, BookPlus, Shield, BarChart3, Calendar, X } from "lucide-react";
import { useState, useEffect } from "react";
import { AssignmentUpload } from "@/components/AssignmentUpload";
import api from "@/lib/api";

const StatCard = ({ title, value, icon: Icon, change, color = "bg-zinc-100 dark:bg-zinc-800" }: { title: string; value: number | string; icon: React.ElementType; change?: string; color?: string }) => (
    <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
            <div className="flex items-center justify-between"><div className={`p-3 rounded-xl ${color}`}><Icon className="h-5 w-5 text-zinc-700 dark:text-zinc-300" /></div>{change && <Badge variant="success" className="text-xs"><TrendingUp className="h-3 w-3 mr-1" />{change}</Badge>}</div>
            <div className="mt-4"><p className="text-3xl font-bold text-zinc-900 dark:text-white">{value}</p><p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{title}</p></div>
        </CardContent>
    </Card>
);

const AddUserModal = ({ newUser, setNewUser, onClose, onSubmit, isAddingUser }: any) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between"><h2 className="text-xl font-bold text-zinc-900 dark:text-white">Add New User</h2><button onClick={onClose}><X className="h-5 w-5 text-zinc-500" /></button></div>
            <div className="p-6 space-y-4">
                <Input placeholder="Full Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
                <Input placeholder="Email" type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                <Input placeholder="Password" type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                <select className="w-full px-3 py-2 rounded-lg border bg-white dark:bg-zinc-800" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="p-6 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={onSubmit} disabled={isAddingUser}>{isAddingUser ? "Creating..." : "Create User"}</Button>
            </div>
        </motion.div>
    </div>
);

import { demoData } from "@/lib/demoData";

const AdminPortal = ({ demoMode = false }: { demoMode?: boolean }) => {
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    // User logic
    const user = demoMode ? demoData.admin.user : JSON.parse(localStorage.getItem('user') || '{}');
    const adminName = user.name || "Administrator";
    const adminData = { name: adminName, role: "Super Admin" };

    // Stats State: Use demo data or defaults
    const [stats, setStats] = useState(demoMode ? demoData.admin.stats : {
        totalStudents: 0, totalTeachers: 0, totalSubjects: 0, totalBatches: 0, activeAssignments: 0, pendingGrading: 0
    });

    // Recent users (placeholder for now)
    const [recentUsers, setRecentUsers] = useState<any[]>([]);

    // Add User Modal State
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "student" });
    const [isAddingUser, setIsAddingUser] = useState(false);

    useEffect(() => {
        if (demoMode) {
            // In demo mode, stats are already set via useState initialization
            return;
        }

        // Fetch real stats and users - Placeholder
        const fetchAdminData = async () => {
            // Placeholder for stats fetching
        };
        fetchAdminData();
    }, [demoMode]);

    const handleAddUser = async () => {
        setIsAddingUser(true);
        try {
            if (demoMode) {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert("✅ Demo Mode: User created successfully!");
                setShowAddUserModal(false);
                setNewUser({ name: "", email: "", password: "", role: "student" });
                setIsAddingUser(false);
                return;
            }

            await api.post('/auth/register', newUser);
            alert("✅ User created successfully!");
            setShowAddUserModal(false);
            setNewUser({ name: "", email: "", password: "", role: "student" });
        } catch (error: any) {
            console.error("Add user failed", error);
            alert(`❌ Failed: ${error.response?.data?.message || 'Unknown error'}`);
        } finally {
            setIsAddingUser(false);
        }
    };

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {showAddUserModal && <AddUserModal newUser={newUser} setNewUser={setNewUser} onClose={() => setShowAddUserModal(false)} onSubmit={handleAddUser} isAddingUser={isAddingUser} />}
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
                            <ThemeToggle />
                            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-700">
                                <Avatar><AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">AD</AvatarFallback></Avatar>
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
                        <div className="flex gap-3"><Button onClick={() => setIsUploadOpen(true)} className="bg-emerald-600 hover:bg-emerald-700"><Plus className="h-4 w-4 mr-2" />Upload Question Paper</Button></div>
                    </motion.div>

                    {/* Stats */}
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
                            <TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="users">Users</TabsTrigger></TabsList>

                            <TabsContent value="overview" className="space-y-6">
                                <div className="grid lg:grid-cols-2 gap-6">
                                    <Card className="border-0 shadow-lg">
                                        <CardHeader className="pb-4"><CardTitle className="text-lg">Quick Actions</CardTitle></CardHeader>
                                        <CardContent className="grid grid-cols-2 gap-4">
                                            <button onClick={() => { setNewUser({ ...newUser, role: 'student' }); setShowAddUserModal(true); }} className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 transition-colors text-left"><UserPlus className="h-5 w-5 mb-2 text-blue-600" /><p className="font-medium">Add Student</p></button>
                                            <button onClick={() => { setNewUser({ ...newUser, role: 'teacher' }); setShowAddUserModal(true); }} className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 transition-colors text-left"><Users className="h-5 w-5 mb-2 text-emerald-600" /><p className="font-medium">Add Teacher</p></button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            <TabsContent value="users">
                                <Card className="border-0 shadow-lg">
                                    <CardHeader><div className="flex items-center justify-between"><div><CardTitle>User Management</CardTitle></div><Button onClick={() => setShowAddUserModal(true)}><UserPlus className="h-4 w-4 mr-2" />Add User</Button></div></CardHeader>
                                    <CardContent>
                                        <p className="text-zinc-500">User list management coming soon.</p>
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
