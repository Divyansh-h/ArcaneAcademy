import { Link } from "react-router-dom";
import { GraduationCap, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
    product: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Demo", href: "/demo" },
    ],
    company: [
        { name: "About", href: "#about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
    ],
    legal: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
    ],
};

const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
];

export function Footer() {
    return (
        <footer className="bg-zinc-900 text-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-900">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold">
                                Arcane<span className="text-zinc-400">Academy</span>
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-zinc-400 max-w-xs">
                            Transform your academic experience with our intelligent grading and management platform.
                        </p>
                        <div className="mt-6 flex gap-4">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">Product</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">Company</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold">Legal</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-zinc-400 hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-zinc-800 pt-8">
                    <p className="text-center text-sm text-zinc-400">
                        © {new Date().getFullYear()} Arcane Academy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
