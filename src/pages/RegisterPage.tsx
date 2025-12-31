import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GraduationCap, ArrowLeft, Mail, Lock, User as UserIcon, BookOpen, Shield, Check } from "lucide-react";
import api from "@/lib/api";

const roles = [
    { id: "student", name: "Student", icon: UserIcon, description: "View assignments, submit work, track grades" },
    { id: "teacher", name: "Teacher", icon: BookOpen, description: "Create and grade assignments, manage classes" },
    { id: "admin", name: "Admin", icon: Shield, description: "Full system access and user management" },
];

export default function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("student");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password,
                role: selectedRole
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate(`/${selectedRole}`);
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex">
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-zinc-900 via-violet-950 to-zinc-900 text-white p-12 flex-col justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-900 transition-transform group-hover:scale-105">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold">Arcane<span className="text-zinc-400">Academy</span></span>
                </Link>

                <div className="space-y-8">
                    <h1 className="text-4xl font-bold leading-tight">Start your journey<br />with Arcane Academy</h1>
                    <p className="text-zinc-400 text-lg max-w-md">Join thousands of students, teachers, and administrators who trust our platform for academic excellence.</p>
                    <ul className="space-y-4">
                        {["Smart grading with AI assistance", "Real-time progress tracking", "Secure and reliable platform", "Easy assignment management"].map((feature, index) => (
                            <li key={index} className="flex items-center gap-3 text-zinc-300">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500"><Check className="h-3 w-3 text-white" /></div>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center gap-8 text-sm text-zinc-500">
                    <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="absolute top-4 right-4">
                    <ThemeToggle />
                </div>
                <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Link to="/" className="lg:hidden flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors">
                        <ArrowLeft className="h-4 w-4" />Back to home
                    </Link>

                    <Card className="border-0 shadow-xl">
                        <CardHeader className="space-y-1 pb-6">
                            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                            <CardDescription className="text-center">Enter your details to get started</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleRegister} className="space-y-5">
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">I am a</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {roles.map((role) => (
                                            <button key={role.id} type="button" onClick={() => setSelectedRole(role.id)}
                                                className={`p-3 rounded-xl border-2 transition-all duration-200 ${selectedRole === role.id ? "border-violet-600 bg-violet-600 text-white" : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600"}`}>
                                                <role.icon className={`h-5 w-5 mx-auto mb-1 ${selectedRole === role.id ? "text-white" : "text-zinc-600 dark:text-zinc-300"}`} />
                                                <span className={`text-xs font-medium ${selectedRole === role.id ? "text-white" : "text-zinc-900 dark:text-white"}`}>{role.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                        <Input id="name" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                        <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                        <Input id="password" type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required minLength={8} />
                                    </div>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Must be at least 8 characters</p>
                                </div>

                                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                    {isLoading ? "Creating account..." : "Create account"}
                                </Button>

                                <p className="text-xs text-center text-zinc-500 dark:text-zinc-400">
                                    By creating an account, you agree to our <Link to="/terms" className="underline hover:text-zinc-900 dark:hover:text-white">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-zinc-900 dark:hover:text-white">Privacy Policy</Link>
                                </p>

                                <Separator />

                                <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
                                    Already have an account? <Link to="/login" className="font-medium text-violet-600 dark:text-violet-400 hover:underline">Sign in</Link>
                                </p>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mt-6 text-center">
                        <Badge variant="secondary" className="text-xs">Demo Mode: Registration is simulated</Badge>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
