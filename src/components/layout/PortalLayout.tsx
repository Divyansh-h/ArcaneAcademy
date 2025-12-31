import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Bell, Settings, LogOut } from "lucide-react";

interface PortalLayoutProps {
    children: React.ReactNode;
    portalName: string;
    userName: string;
    userBatch: string;
}

export function PortalLayout({ children, portalName, userName, userBatch }: PortalLayoutProps) {
    return (
        <div className="min-h-screen bg-zinc-50">
            <header className="sticky top-0 z-50 bg-white border-b border-zinc-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white">
                                    <GraduationCap className="h-5 w-5" />
                                </div>
                                <span className="text-xl font-bold text-zinc-900">
                                    Arcane<span className="text-zinc-500">Academy</span>
                                </span>
                            </Link>
                            <Badge variant="secondary" className="hidden sm:flex">{portalName}</Badge>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 rounded-lg hover:bg-zinc-100 transition-colors">
                                <Bell className="h-5 w-5 text-zinc-600" />
                                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-zinc-100 transition-colors">
                                <Settings className="h-5 w-5 text-zinc-600" />
                            </button>
                            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
                                <Avatar>
                                    <AvatarFallback className="bg-zinc-900 text-white">
                                        {userName.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-zinc-900">{userName}</p>
                                    <p className="text-xs text-zinc-500">{userBatch}</p>
                                </div>
                            </div>
                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="text-zinc-600">
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
