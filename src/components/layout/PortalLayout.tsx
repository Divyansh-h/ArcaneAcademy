import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Bell, LogOut } from "lucide-react";

interface PortalLayoutProps {
    children: React.ReactNode;
    portalName: string;
    userName: string;
    userBatch: string;
}

export function PortalLayout({ children, portalName, userName, userBatch }: PortalLayoutProps) {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="flex items-center gap-2.5 group">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white transition-transform duration-200 group-hover:scale-105">
                                    <GraduationCap className="h-5 w-5" />
                                </div>
                                <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                                    Arcane<span className="text-zinc-400">Academy</span>
                                </span>
                            </Link>
                            <Badge variant="secondary" className="hidden sm:flex">{portalName}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <button className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                                <Bell className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-violet-600 rounded-full" />
                            </button>
                            <div className="flex items-center gap-3 pl-4 ml-2 border-l border-zinc-200 dark:border-zinc-800">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-sm font-medium">
                                        {userName.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-zinc-900 dark:text-white">{userName}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{userBatch}</p>
                                </div>
                            </div>
                            <Link to="/login">
                                <Button variant="ghost" size="icon" className="text-zinc-500">
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </Link>
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
