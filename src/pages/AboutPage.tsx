
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Header />

            <main className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-20">
                        <Badge variant="outline" className="mb-4">Our Mission</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">Reimagining Education for the <span className="text-violet-600 dark:text-violet-400">Future</span></h1>
                        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Arcane Academy is on a mission to democratize advanced grading algorithms and streamlined academic management for institutions worldwide.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {[
                            { icon: Globe, title: "Global Reach", desc: "Supporting institutions across 50+ countries with localized solutions." },
                            { icon: Shield, title: "Trusted Security", desc: "Enterprise-grade data protection ensuring student privacy." },
                            { icon: Zap, title: "Innovation First", desc: "Constant value delivery through AI-driven grading technologies." }
                        ].map((item, i) => (
                            <Card key={i} className="border-0 shadow-lg bg-zinc-50 dark:bg-zinc-900/50">
                                <CardContent className="p-8 text-center">
                                    <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                                        <item.icon className="h-6 w-6 text-zinc-900 dark:text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 dark:text-white">{item.title}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="bg-zinc-900 dark:bg-zinc-900/50 rounded-3xl p-8 md:p-16 text-center shadow-2xl overflow-hidden relative">
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                            <p className="text-zinc-300 leading-relaxed mb-8">
                                Founded in 2024, Arcane Academy started with a simple question: "Why is grading still so manual?"
                                We set out to build a platform that automates the tedious parts of education, allowing teachers
                                to focus on what matters most—teaching.
                            </p>
                            <div className="flex justify-center gap-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-emerald-400">2024</div>
                                    <div className="text-zinc-500 text-sm">Founded</div>
                                </div>
                                <div className="w-px bg-zinc-700 h-12"></div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-400">10k+</div>
                                    <div className="text-zinc-500 text-sm">Users</div>
                                </div>
                                <div className="w-px bg-zinc-700 h-12"></div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-violet-400">99%</div>
                                    <div className="text-zinc-500 text-sm">Satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
