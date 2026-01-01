
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Bell, Settings, LogOut } from "lucide-react";

interface PortalLayoutProps {
    children: React.ReactNode;
    portalName?: string;
    userType?: 'student' | 'teacher' | 'admin';
    userName?: string;
    demoMode?: boolean;
}

export function PortalLayout({ children, portalName, userType, userName = "User", demoMode = false }: PortalLayoutProps) {
    const title = portalName || (userType === 'student' ? 'Student Portal' : userType === 'teacher' ? 'Teacher Portal' : 'Admin Portal');

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 transition-transform group-hover:scale-105">
                                    <GraduationCap className="h-5 w-5" />
                                </div>
                                <span className="text-xl font-bold text-zinc-900 dark:text-white">
                                    Arcane<span className="text-zinc-500 dark:text-zinc-400">Academy</span>
                                </span>
                            </Link>
                            <Badge variant="secondary" className="hidden sm:flex">{title}</Badge>
                            {demoMode && <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-900/20">Demo Mode</Badge>}
                        </div>
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            {demoMode ? (
                                <Link to="/">
                                    <Button variant="outline" size="sm" className="bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 dark:bg-amber-900 dark:border-amber-800 dark:text-amber-100">
                                        <LogOut className="h-4 w-4 mr-2" /> Exit Demo
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <button className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                        <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                                    </button>
                                    <button className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                        <Settings className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                                    </button>
                                    <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-700">
                                        <Avatar>
                                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                                                {userName.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="hidden md:block">
                                            <p className="text-sm font-medium text-zinc-900 dark:text-white">{userName}</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{userType === 'student' ? 'Student' : userType === 'teacher' ? 'Teacher' : 'Admin'}</p>
                                        </div>
                                    </div>
                                    <Link to="/login">
                                        <Button variant="ghost" size="sm">
                                            <LogOut className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
