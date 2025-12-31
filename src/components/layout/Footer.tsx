import { Link } from "react-router-dom";
import { GraduationCap, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
    product: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Demo", href: "#demo" },
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
        <footer className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white">
                                <GraduationCap className="h-4 w-4" />
                            </div>
                            <span className="font-semibold text-zinc-900 dark:text-white">
                                Arcane<span className="text-zinc-400">Academy</span>
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
                            Smart grading for modern education.
                        </p>
                        <div className="mt-4 flex gap-3">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="p-2 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <item.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Product</h3>
                        <ul className="mt-3 space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Company</h3>
                        <ul className="mt-3 space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Legal</h3>
                        <ul className="mt-3 space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link to={link.href} className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-center text-sm text-zinc-400">
                        © {new Date().getFullYear()} Arcane Academy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
