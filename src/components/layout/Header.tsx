import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Demo", href: "#demo" },
    { name: "About", href: "#about" },
];

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200/50 dark:border-zinc-800/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white transition-transform duration-200 group-hover:scale-105">
                            <GraduationCap className="h-5 w-5" />
                        </div>
                        <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                            Arcane<span className="text-zinc-400">Academy</span>
                        </span>
                    </Link>

                    {isHomePage && (
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </nav>
                    )}

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <div className="hidden sm:flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="ghost" size="sm">Sign in</Button>
                            </Link>
                            <Link to="/register">
                                <Button size="sm">Get Started</Button>
                            </Link>
                        </div>
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                            ) : (
                                <Menu className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
                        <div className="flex flex-col gap-2">
                            {isHomePage && navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex flex-col gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800 sm:hidden">
                                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="ghost" className="w-full justify-start">Sign in</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button className="w-full">Get Started</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
