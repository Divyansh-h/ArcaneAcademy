import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export function Header() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isLandingPage = location.pathname === "/";

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white transition-transform group-hover:scale-105">
                        <GraduationCap className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold text-zinc-900">
                        Arcane<span className="text-zinc-500">Academy</span>
                    </span>
                </Link>

                {isLandingPage && (
                    <div className="hidden lg:flex lg:gap-x-8">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <Link to="/login" className="hidden sm:block">
                        <Button variant="ghost" size="sm">Sign in</Button>
                    </Link>
                    <Link to="/register">
                        <Button size="sm">Get Started</Button>
                    </Link>

                    <button
                        type="button"
                        className="lg:hidden -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-700"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Toggle menu</span>
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </nav>

            <div className={cn("lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
                <div className="space-y-1 px-4 pb-4 pt-2 bg-white border-b border-zinc-100">
                    {isLandingPage && navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="block rounded-lg px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}
                    <Link
                        to="/login"
                        className="block rounded-lg px-3 py-2 text-base font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 sm:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </header>
    );
}
