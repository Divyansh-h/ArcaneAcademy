import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GraduationCap, ArrowLeft, Mail, Lock, User, BookOpen, Shield } from "lucide-react";
import api from "@/lib/api";

const roles = [
    { id: "student", name: "Student", icon: User, description: "Access assignments, grades, and track your progress", color: "bg-blue-50 border-blue-200 hover:bg-blue-100" },
    { id: "teacher", name: "Teacher", icon: BookOpen, description: "Create assignments, grade submissions, manage classes", color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100" },
    { id: "admin", name: "Admin", icon: Shield, description: "Full system control, user management, analytics", color: "bg-violet-50 border-violet-200 hover:bg-violet-100" },
];

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) return;

        setIsLoading(true);
        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            // Store token and user info
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate(`/${selectedRole}`);
        } catch (error) {
            console.error('Login failed:', error);
            // In a real app we'd show a toast here
            alert('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 flex">
            <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 text-white p-12 flex-col justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-900 transition-transform group-hover:scale-105">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold">Arcane<span className="text-zinc-400">Academy</span></span>
                </Link>

                <div className="space-y-6">
                    <h1 className="text-4xl font-bold leading-tight">Welcome back to<br />your academic journey</h1>
                    <p className="text-zinc-400 text-lg max-w-md">Sign in to access your personalized dashboard, track your progress, and manage your academic experience.</p>
                </div>

                <div className="flex items-center gap-8 text-sm text-zinc-500">
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Link to="/" className="lg:hidden flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-8 transition-colors">
                        <ArrowLeft className="h-4 w-4" />Back to home
                    </Link>

                    <Card className="border-0 shadow-xl">
                        <CardHeader className="space-y-1 pb-6">
                            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
                            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-zinc-700">Select your role</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {roles.map((role) => (
                                            <button key={role.id} type="button" onClick={() => setSelectedRole(role.id)}
                                                className={`p-4 rounded-xl border-2 transition-all duration-200 ${selectedRole === role.id ? "border-zinc-900 bg-zinc-900 text-white" : `border-zinc-200 ${role.color}`}`}>
                                                <role.icon className={`h-6 w-6 mx-auto mb-2 ${selectedRole === role.id ? "text-white" : "text-zinc-700"}`} />
                                                <span className="text-sm font-medium">{role.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                    {selectedRole && <p className="text-xs text-zinc-500 text-center">{roles.find((r) => r.id === selectedRole)?.description}</p>}
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                        <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-sm font-medium text-zinc-700">Password</label>
                                        <Link to="/forgot-password" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">Forgot password?</Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                        <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" size="lg" disabled={!selectedRole || isLoading}>
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </Button>

                                <p className="text-center text-sm text-zinc-600">
                                    Don't have an account? <Link to="/register" className="font-medium text-zinc-900 hover:underline">Sign up</Link>
                                </p>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mt-6 text-center">
                        <Badge variant="secondary" className="text-xs">Demo Mode: Any credentials will work</Badge>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
